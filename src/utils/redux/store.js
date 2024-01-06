import { legacy_createStore as createStore } from "redux";
import { SET_MODE } from "./actionTypes";

const initialState = {
  sidebarShow: true,
  mode: "light",
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SET_MODE:
      return { ...state, mode: rest.mode };
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState);

export default store;
