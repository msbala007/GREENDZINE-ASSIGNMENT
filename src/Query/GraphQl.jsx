import { gql } from "@apollo/client";

const COURSE_DATA = gql`
  query {
    data {
      id
      Title
      Mode
      Level
      Pricing
    }
  }
`;
const GET_SPECIFIC_DATA = gql`
  query ($courseId: ID!) {
    course(id: $courseId) {
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
const EDIT_DATA = gql`
  mutation ($editCourseDataId: ID!, $input: editData) {
    editCourseData(id: $editCourseDataId, input: $input) {
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

const DELETE_DATA = gql`
  mutation ($deleteDataId: ID!) {
    deleteData(id: $deleteDataId) {
      id
    }
  }
`;

export { EDIT_DATA, COURSE_DATA, GET_SPECIFIC_DATA, DELETE_DATA };
