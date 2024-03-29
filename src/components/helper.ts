import { WeatherInfo } from "../App";

type TemperatureError = {
  error?: string;
};
type TemperatureValue = {
  temperature: number | "";
};

const WEEKINMILSEK = 604800000;

export const temperatureValidation = (value: TemperatureValue) => {
  const errors: TemperatureError = {};
  if (value.temperature === "") {
    errors.error = "Заполните температуру";
  } else if (value.temperature > 60) {
    errors.error = "Температура должна быть меньше 60";
  } else if (value.temperature < -50) {
    errors.error = "Температура должна быть больше -50";
  }

  return errors;
};

export const prepareChartsOptions = (data: Array<WeatherInfo>) => {
  const sortData = data.map((i) => {
    return {
      date: new Date(Date.parse(i.date)),
      temperature: i.temperature,
      weather: i.weather,
    };
  });
  sortData.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });

  const xDate: Array<string> = [];
  const series: Array<number> = [];
  const series2: Array<string | undefined> = [];
  const series3: Array<number> = [];

  sortData.forEach((item) => {
    const mas = sortData.filter(
      (x) =>
        item.date.getTime() - x.date.getTime() < WEEKINMILSEK &&
        item.date.getTime() - x.date.getTime() >= 0
    );
    const avg = mas.reduce((sum, x) => (sum += x.temperature), 0) / mas.length;
    xDate.push(item.date.toLocaleString());
    series.push(item.temperature);
    series2.push(item.weather);
    series3.push(Math.round(avg));
  });

  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: xDate,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: series,
        name: "Температура",
        type: "line",
      },
      {
        data: series2,
        name: "Погода",
        type: "line",
      },
      {
        data: series3,
        name: "Средняя температура за 7 дней",
        type: "line",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return options;
};
