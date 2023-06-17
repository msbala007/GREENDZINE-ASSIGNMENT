import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment/moment";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, gql, useQuery, useLazyQuery } from "@apollo/client";
import { GET_SPECIFIC_DATA, EDIT_DATA } from "../Query/GraphQl";
import { COURSE_DATA } from "../Query/GraphQl";

const EDITDATA = ({ id, data }) => {
  const [course, setdata] = useState({
    Title: "",
    Level: "",
    Pricing: "",
    Learning: "",
    description: "",
  });
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  useEffect(() => {
    setdata({
      Title: data?.Title,
      Learning: data?.Mode,
      description: data?.Description,
      Pricing: data?.Pricing,
      Level: data?.Level,
    });
  }, [data]);

  const handleChange = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const { refetch } = useQuery(COURSE_DATA);

  console.log(refetch);

  const [updateData] = useMutation(EDIT_DATA);

  console.log(course);
  const handleSubmit = async (e) => {
    e.preventDefault();

    updateData({
      variables: {
        editCourseDataId: id,
        input: {
          Title: course.Title,
          Level: course.Level,
          Pricing: course.Pricing,
          FromDate: moment(fromDate.$d).format("Do MMM YYYY"),
          ToDate: moment(toDate.$d).format("Do MMM YYYY"),
          Mode: data.Learning,
          Start: moment(fromTime.$d).format("LT"),
          End: moment(toTime.$d).format("LT"),
          Description: course.description,
        },
      },
    });

    navigate("/", refetch());
  };
  return (
    <>
      <section className="bg-pink-200 space-y-4 ">
        <div className="text-center ">
          <h1 className="py-5 font-bold text-blue-950 text-2xl">
            EDIT PSLE COURSE
          </h1>
        </div>

        <div className=" bg-white h-[500px] m-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 p-4 place-content-center">
              <div className="space-y-4 mt-4 flex flex-col">
                <TextField
                  id="outlined-basic"
                  label="Title"
                  name="Title"
                  value={course.Title}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  name="Level"
                  value={course.Level}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Class Level"
                  variant="outlined"
                />
                <TextField
                  name="Pricing"
                  value={course.Pricing}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Pricing"
                  variant="outlined"
                />
                <h1>Class duration</h1>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    name="To"
                    value={course.To}
                    onChange={(newValue) => setToDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div className="space-y-4 mt-4 flex flex-col">
                <TextField
                  name="Learning"
                  value={course.Learning}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Mode Of Learning"
                  variant="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="From "
                      onChange={(newValue) => setFromTime(newValue)}
                    />
                    <TimePicker
                      label="To"
                      onChange={(newValue) => setToTime(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  id="outlined-multiline-static"
                  label="Brief Description"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                //   onClick={handleSubmit}

                className=" bg-orange-400 px-20 py-2 text-white"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EDITDATA;
