import { fetchuser } from "../utils/fetchLocalStorage";

const userInfo = fetchuser();

export const initialState = {
  user: userInfo,
};
