import React, { useState } from "react";

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
import { useNavigate } from "react-router-dom";
import { useMutation, gql, useQuery } from "@apollo/client";
import { COURSE_DATA } from "../Query/GraphQl";
import toast, { Toaster } from "react-hot-toast";
import AlertDialogSlide from "./AlertDialogSlide";

const ADD_COURSE = gql`
  mutation ($input: courseDataInput!) {
    courseData(input: $input) {
      Title
      Level
      Pricing
      FromDate
      ToDate
      Mode
      Start
      End
      Description
    }
  }
`;

const AddCourse = () => {
  const { refetch } = useQuery(COURSE_DATA);

  const [data, setdata] = useState({
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

  const handleChange = (e) => {
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const [addCourse, { data: success, error, loading }] =
    useMutation(ADD_COURSE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      data.Level.trim() === "" ||
      data.Title.trim() === " " ||
      data.Pricing.trim() === " " ||
      data.Learning.trim() === " " ||
      data.description.trim() === " "
    ) {
      return alert("Please provide all details");
    }

    addCourse({
      variables: {
        input: {
          Title: data.Title,
          Level: data.Level,
          Pricing: data.Pricing,
          FromDate: moment(fromDate.$d).format("Do MMM YYYY"),
          ToDate: moment(toDate.$d).format("Do MMM YYYY"),
          Mode: data.Learning,
          Start: moment(fromTime.$d).format("LT"),
          End: moment(toTime.$d).format("LT"),
          Description: data.description,
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
            ADD PSLE COURSE
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
                  value={data.Title}
                  onChange={handleChange}
                  variant="outlined"
                />
                <TextField
                  name="Level"
                  value={data.Level}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Class Level"
                  variant="outlined"
                />
                <TextField
                  name="Pricing"
                  value={data.Pricing}
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
                    value={data.To}
                    onChange={(newValue) => setToDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div className="space-y-4 mt-4 flex flex-col">
                <TextField
                  name="Learning"
                  value={data.Learning}
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
                  value={data.description}
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
                onClick={handleSubmit}
                className=" bg-orange-400 px-20 py-2 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddCourse;
