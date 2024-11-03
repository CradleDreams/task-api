import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../shared/api/axios";

interface IGeoUsers {
  lat: string;
  lng: string;
}
interface IAdressUsers {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeoUsers;
}
interface ICompanyUsers {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface IUsersApi {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAdressUsers;
  phone: string;
  website: string;
  company: ICompanyUsers;
  status: string;
}

interface IUsersData {
  usersData: IUsersApi[];
  status: string;
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get("/users");
  return data;
});

const initialState: IUsersData = {
  usersData: [],
  status: "loading",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUsersApi[]>) => {
          state.status = "loaded";
          state.usersData = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const usersReducer = userSlice.reducer;
