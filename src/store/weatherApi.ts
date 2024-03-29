import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WeatherInfo } from "../App";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  tagTypes: ["Weather"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (build) => ({
    getWeather: build.query<Array<WeatherInfo>, void>({
      query: () => "weather",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Weather" as const, id })),
              { type: "Weather", id: "LIST" },
            ]
          : [{ type: "Weather", id: "LIST" }],
    }),
    addWeather: build.mutation({
      query: (body) => ({
        url: "weather",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Weather", id: "LIST" }],
    }),
    updateWeather: build.mutation({
      query: (body) => ({
        url: "weather",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Weather", id: "LIST" }],
    }),
    deleteWeather: build.mutation({
      query: (id) => ({
        url: `weather/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Weather", id: "LIST" }],
    }),
  }),
});

export const {
  useGetWeatherQuery,
  useAddWeatherMutation,
  useUpdateWeatherMutation,
  useDeleteWeatherMutation,
} = weatherApi;
