import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../shared/api/axios";

export interface IPostsApi {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IPostsData {
  postsData: IPostsApi[];
  status: string;
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

const initialState: IPostsData = {
  postsData: [],
  status: "loading",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<IPostsApi[]>) => {
          state.status = "loaded";
          state.postsData = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const postsReducer = postsSlice.reducer;
