import React from "react";
import { Field, ErrorMessage } from "formik";

function Select(props) {
  const { name, ...rest } = props;
  const options = [
    { value: "", option: "Select Time" },
    { value: "00:00", option: "12:00 Am " },
    { value: "01:00", option: "01:00 Am" },
    { value: "02:00", option: "02:00 Am" },
    { value: "03:00", option: "03:00 Am" },
    { value: "04:00", option: "04:00 Am" },
    { value: "05:00", option: "05:00 Am" },
    { value: "06:00", option: "06:00 Am" },
    { value: "07:00", option: "07:00 Am" },
    { value: "08:00", option: "08:00 Am" },
    { value: "09:00", option: "09:00 Am" },
    { value: "10:00", option: "10:00 Am" },
    { value: "11:00", option: "11:00 Am" },
    { value: "12:00", option: "12:00 Pm" },
    { value: "13:00", option: "01:00 Pm" },
    { value: "14:00", option: "02:00 Pm" },
    { value: "15:00", option: "03:00 Pm" },
    { value: "16:00", option: "04:00 Pm" },
    { value: "17:00", option: "05:00 Pm" },
    { value: "18:00", option: "06:00 Pm" },
    { value: "19:00", option: "07:00 Pm" },
    { value: "20:00", option: "08:00 Pm" },
    { value: "21:00", option: "09:00 Pm" },
    { value: "22:00", option: "10:00 Pm" },
    { value: "23:00", option: "11:00 Pm" },
  ];
  return (
    <div>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.option}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Select;
