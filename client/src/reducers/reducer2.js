import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (reducer2 = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      break;
    case CREATE:
      return [...reducer2, action.payload];
    case UPDATE:
      return reducer2.map((data) =>
        data._id === action.payload._id ? action.payload : data
      );
    case DELETE:
      return reducer2.filter((data) => data._id !== action.payload);

    default:
      return reducer2;
  }
};
