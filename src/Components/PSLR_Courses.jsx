import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import data from './data';
import { useCalendarState } from "@mui/x-date-pickers/internals";
import { useQuery, gql } from "@apollo/client";
import { COURSE_DATA } from "../Query/GraphQl";

import AlertDialogSlide from "./AlertDialogSlide";
import { ScaleLoader } from "react-spinners";

const PSLR_Courses = () => {
  const [Page, setPage] = useState(1);
  const { data, refetch, loading } = useQuery(COURSE_DATA);
  const pageNo = Page * 10;
  console.log(pageNo);
  const previousPage = pageNo - 10;
  const TotalPages = Math.ceil(data?.data.length / 10);

  console.log(data);

  if (loading) return <div className="flex justify-center items-center h-screen"><ScaleLoader color="#000000" /></div>;
  const id = useParams();

  console.log(id);
  return (
    <>
      <div>
        <div className="flex justify-between p-4">
          <div>
            <h1 className="text-orange-400 font-bold">PSLR Courses</h1>
          </div>
          <hr className="border-spacing-8 text-black border-blue-950" />
          <div>
            <Link
              to="/add-course"
              className="bg-orange-400 px-4 py-1 rounded-md text-white"
            >
              Add PSLR Course
            </Link>
          </div>
        </div>

        <section className="p-4 ">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-blue-300">
                <TableRow>
                  <TableCell>Serial No</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Class Level</TableCell>
                  <TableCell align="right">Pricing</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data
                  .slice(previousPage, pageNo)
                  .map(({ id, Title, Pricing, Level }, i) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={id}
                    >
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {Title}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {Level}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {Pricing}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        <div className="flex justify-center items-center">
                          <Link to={`/edit-data/${id}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              data-name="Layer 1"
                              viewBox="0 0 24 24"
                              className="w-4 h-4 cursor-pointer"
                              id="edit"
                            >
                              <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                              <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                            </svg>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        <div className="-z-50 xl:w-0 lg:w-0  ">
                          <AlertDialogSlide id={id} Title={Title} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <div className="flex justify-between items-center h-8 mt-3 mx-4">
            <div>
              <h1>
                Sowing {previousPage} to {pageNo} out of {data.data.length}{" "}
              </h1>
            </div>
            <div>
              <Stack spacing={2}>
                <Pagination
                  count={TotalPages}
                  shape="rounded"
                  color="primary"
                  onChange={(e) => setPage(e.currentTarget.textContent)}
                />
              </Stack>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PSLR_Courses;
