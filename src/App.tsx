import { useGetWeatherQuery } from "./store";
import { useState } from "react";
import CreateNewRecordForm from "./components/CreateNewRecordForm";
import WeatherDataTable from "./components/WeatherDataTable";
import WeatherCharts from "./components/WeatherCharts";

import "./App.scss";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/md-dark-indigo/theme.css";

export type WeatherInfo = {
  id: string;
  date: string;
  temperature: number;
  weather?: string;
  authorId?: number;
  author?: string;
  comments?: string;
};

function App() {
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  const [dataRow, setDataRow] = useState<WeatherInfo>({
    id: "",
    date: new Date().toString(),
    temperature: 0,
    weather: "",
    author: "",
    comments: "",
  });

  const { data = [], isLoading } = useGetWeatherQuery();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="container">
        <WeatherDataTable
          data={data}
          setDataRow={setDataRow}
          setVisibleForm={setVisibleForm}
        />
        <WeatherCharts data={data} />
      </div>
      <CreateNewRecordForm
        visible={visibleForm}
        dataRow={dataRow}
        setDataRow={setDataRow}
        setVisible={setVisibleForm}
      />
    </>
  );
}

export default App;
