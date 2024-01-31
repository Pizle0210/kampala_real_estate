import { AUTH_URL } from "../store/constants";
import { apiSlice } from "./apiSlice";

const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = usersSlice;
