import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { useAddWeatherMutation, useUpdateWeatherMutation } from "../store";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { WeatherInfo } from "../App";
import { temperatureValidation } from "./helper";

const weathers = [
  { name: "Солнечно" },
  { name: "Облачно" },
  { name: "Малооблачно" },
  { name: "Пасмурно" },
  { name: "Дождь" },
];

type CreateNewRecordFromProps = {
  visible: boolean;
  setVisible: (flag: boolean) => void;
  dataRow: WeatherInfo;
  setDataRow: (dataRow: WeatherInfo) => void;
};

const CreateNewRecordForm = ({
  visible,
  setVisible,
  dataRow,
  setDataRow,
}: CreateNewRecordFromProps) => {
  const { id } = dataRow;
  const isAddMode = !id;
  const [addWeather] = useAddWeatherMutation();
  const [updateWeather] = useUpdateWeatherMutation();
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("/api/author")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAuthors(data);
      });
  }, []);

  const onSend = async (values: Omit<WeatherInfo, "date">) => {
    if (isAddMode) {
      await addWeather(values).unwrap();
    } else {
      await updateWeather(values).unwrap();
    }
    setDataRow({
      id: "",
      date: new Date().toString(),
      temperature: 0,
      weather: "",
      authorId: 0,
      author: "",
      comments: "",
    });
  };

  const formik = useFormik({
    initialValues: { ...dataRow },
    enableReinitialize: true,
    validate: temperatureValidation,
    onSubmit: (values) => {
      onSend(values);
      formik.resetForm();
      setVisible(false);
    },
  });

  const getFormErrorMessage = () => {
    if (formik.touched["temperature"]) {
      return null;
    }
    const validationError = formik.errors["temperature"];
    return validationError ? (
      <small className="p-error">{validationError}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <Dialog
      visible={visible}
      className="p-fluid"
      header={isAddMode ? "Новая запись" : "Изменить запись"}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      modal
      onHide={() => {
        setDataRow({
          id: "",
          date: new Date().toString(),
          temperature: 0,
          weather: "",
          authorId: 0,
          author: "",
          comments: "",
        });
        setVisible(false);
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="date" className="font-bold">
            Дата
          </label>
          <Calendar
            inputId="date"
            name="date"
            value={new Date(Date.parse(formik.values.date))}
            showTime
            hourFormat="24"
            showButtonBar
            required
            onChange={(e) => {
              formik.setFieldValue("date", e.target.value);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="temperature" className="font-bold">
            Температура*
          </label>
          <InputNumber
            inputId="in_temperature"
            name="temperature"
            maxFractionDigits={2}
            value={formik.values.temperature}
            required
            onValueChange={(e) => {
              formik.setFieldValue("temperature", e.value);
            }}
            pt={{
              input: {
                root: { autoComplete: "off" },
              },
            }}
          />
        </div>

        {getFormErrorMessage()}

        <div className="field">
          <label htmlFor="weather" className="font-bold">
            Погода
          </label>

          <Dropdown
            editable
            placeholder="Выберите Погоду"
            inputId="weather"
            name="weather"
            options={weathers}
            optionLabel="name"
            value={formik.values.weather}
            onChange={(e) => {
              formik.setFieldValue("weather", e.value.name);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="author" className="font-bold">
            Автор
          </label>
          <Dropdown
            editable
            placeholder="Выберите автора"
            inputId="author"
            name="author"
            options={authors}
            optionLabel="name"
            value={formik.values.author}
            onChange={(e) => {
              formik.setFieldValue("authorId", e.value.code);
              formik.setFieldValue("author", e.value.name);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="comments" className="font-bold">
            Комментарий
          </label>
          <InputTextarea
            name="comments"
            rows={3}
            cols={20}
            value={formik.values.comments}
            onChange={(e) => {
              formik.setFieldValue("comments", e.target.value);
            }}
          />
        </div>
        <Button label="Submit" type="submit" icon="pi pi-check" />
      </form>
    </Dialog>
  );
};

export default CreateNewRecordForm;
