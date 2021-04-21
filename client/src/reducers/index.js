import { combineReducers } from "redux";
import reducer2 from "./reducer2"; // for CRUD the data
import auth from "./auth";

export default combineReducers({
  auth,
  reducer2,
});
