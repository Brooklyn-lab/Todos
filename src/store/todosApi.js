import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => `posts`,
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
