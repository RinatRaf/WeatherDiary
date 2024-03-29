import { temperatureValidation } from "./helper";

describe("Validation tests", () => {
  it("should correctly validate empty value", () => {
    const result = temperatureValidation({ temperature: "" });
    expect(result).toStrictEqual({ error: "Заполните температуру" });
  });

  describe("Max value validation", () => {
    it("should accept 60", () => {
      const result = temperatureValidation({ temperature: 60 });
      expect(result).toStrictEqual({});
    });

    it("should not accept values more than 60", () => {
      const result = temperatureValidation({ temperature: 60.1 });
      expect(result).toStrictEqual({
        error: "Температура должна быть меньше 60",
      });
    });
  });

  describe("Min value validation", () => {
    it("should accept -50", () => {
      const result = temperatureValidation({ temperature: -50 });
      expect(result).toStrictEqual({});
    });

    it("should not accept values less than -50", () => {
      const result = temperatureValidation({ temperature: -50.1 });
      expect(result).toStrictEqual({
        error: "Температура должна быть больше -50",
      });
    });
  });
});
