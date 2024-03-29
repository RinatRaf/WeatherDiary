import { http, HttpResponse } from "msw";
import { v4 } from "uuid";
import { WeatherInfo } from "../App";

let weather: Array<WeatherInfo> = [
  {
    id: v4(),
    date: "2024-03-26T12:47:13.532Z",
    temperature: 27,
    weather: "Солнечно",
    authorId: 1,
    author: "Иван",
  },
  {
    id: v4(),
    date: "2024-03-27T12:47:13.532Z",
    temperature: 23,
    weather: "Солнечно",
    authorId: 1,
    author: "Пётр",
  },
  {
    id: v4(),
    date: "2024-11-28T12:47:13.532Z",
    temperature: 15,
    weather: "Малооблачно",
    authorId: 1,
    author: "Пётр",
  },
  {
    id: v4(),
    date: "2024-03-29T12:47:13.532Z",
    temperature: 14,
    weather: "Пасмурно",
    authorId: 1,
    author: "Пётр",
  },
  {
    id: v4(),
    date: "2024-05-30T12:47:13.532Z",
    temperature: 3,
    weather: "Солнечно",
    authorId: 1,
    author: "Василий",
  },
  {
    id: v4(),
    date: "2024-04-30T12:47:13.532Z",
    temperature: 2,
    weather: "Солнечно",
    authorId: 1,
    author: "Василий",
  },
];
export const handlers = [
  http.get("/api/author", () => {
    return HttpResponse.json([
      { code: 1, name: "Пётр" },
      { code: 2, name: "Иван" },
      { code: 3, name: "Василий" },
    ]);
  }),
  http.get("/api/weather", () => {
    return HttpResponse.json(weather);
  }),
  http.post<
    Record<string, never>,
    WeatherInfo,
    { status: number },
    "/api/weather"
  >("/api/weather", async ({ request }) => {
    const info = await request.json();
    if (info) {
      weather.push({ ...info, id: v4() });
      return HttpResponse.json({
        status: 201,
      });
    }
  }),
  http.put<
    Record<string, never>,
    WeatherInfo,
    { status: number },
    "/api/weather"
  >("/api/weather", async ({ request }) => {
    const info = await request.json();
    if (info) {
      const index = weather.findIndex((i) => i.id == info.id);
      if (index) weather[index] = info;
    }
    return HttpResponse.json({
      status: 200,
    });
  }),
  http.delete("/api/weather/:id", async ({ params }) => {
    const { id } = params;
    weather = weather.filter((i) => i.id !== id);
    return HttpResponse.json(weather, {
      status: 200,
    });
  }),
];
