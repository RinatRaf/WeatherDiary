import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDeleteWeatherMutation } from "../store";
import { WeatherInfo } from "../App";

type WeatherDataTableProps = {
  data: Array<WeatherInfo>;
  setDataRow: (row: WeatherInfo) => void;
  setVisibleForm: (visible: boolean) => void;
};

const WeatherDataTable = ({
  data,
  setDataRow,
  setVisibleForm,
}: WeatherDataTableProps) => {
  const [deleteWeather] = useDeleteWeatherMutation();
  const remove = async (rowData: WeatherInfo) => {
    await deleteWeather(rowData.id).unwrap();
  };

  const edit = (rowData: WeatherInfo) => {
    const editData = { ...rowData };
    setDataRow(editData);
    setVisibleForm(true);
  };

  const actionBody = (rowData: WeatherInfo) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          onClick={() => edit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          onClick={() => remove(rowData)}
        />
      </>
    );
  };

  const dateBody = (rowData: WeatherInfo) => {
    return new Date(Date.parse(rowData.date)).toLocaleString();
  };

  return (
    <div className="dataTable">
      <Button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={() => {
          setVisibleForm(true);
        }}
      />
      <DataTable value={data} scrollable scrollHeight="700px" showGridlines>
        <Column
          field="date"
          dataType="date"
          body={dateBody}
          header="Дата и время"
        ></Column>
        <Column field="temperature" header="Температура"></Column>
        <Column field="weather" header="Погода"></Column>
        <Column field="author" header="Кто заполнил"></Column>
        <Column field="comments" header="Комментарий"></Column>
        <Column body={actionBody} exportable={false}></Column>
      </DataTable>
    </div>
  );
};

export default WeatherDataTable;
