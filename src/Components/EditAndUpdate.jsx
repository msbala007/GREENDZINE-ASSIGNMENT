import React, { useEffect, useState } from "react";

import EDITDATA from "./SOME";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_SPECIFIC_DATA } from "../Query/GraphQl";

const EditAndUpdate = () => {
  const { id } = useParams();
  const { data, refetch, loading } = useQuery(GET_SPECIFIC_DATA, {
    variables: {
      courseId: id,
    },
  });

  return (
    <>
      <EDITDATA id={id} data={data?.course} refetch={refetch()} />
    </>
  );
};

export default EditAndUpdate;
