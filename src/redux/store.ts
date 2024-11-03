import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { usersReducer } from "./slices/users";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
