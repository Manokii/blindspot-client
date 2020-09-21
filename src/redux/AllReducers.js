import { combineReducers } from "redux";
import tournament from "./Tournament";
import ui from "./UI";
import live from "./Live";
const AllReducers = combineReducers({ tournament, ui, live });
export default AllReducers;
