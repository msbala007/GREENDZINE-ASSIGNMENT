import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "./Image";

const GetData = ({ inputData }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get("https://reqres.in/api/users?page=2");
    const { data } = await res.data;
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter((item) =>
    item.first_name.toLowerCase().includes(inputData.toLowerCase())
  );

  const singleValue = "grid-cols-1";
  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-2   place-content-center min-h-screen gap-4 p-4 ">
        <Image data={filteredData} />
      </div>
    </>
  );
};

export default GetData;
