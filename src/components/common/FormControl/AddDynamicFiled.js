import { useState } from "react";
import FormInput from "./FormInput";
import { AddDynamicFieldComponent } from "styles/components/common/FormControl";
function DeleteIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <circle cx="11" cy="11.25" r="10.5" className="fill-gray-200" />
      <path
        d="M14.0305 14.7513L11 11.7209L7.96954 14.7513L6.95939 13.7412L9.98985 10.7107L6.95939 7.68026L7.96954 6.67011L11 9.70056L14.0305 6.67011L15.0406 7.68026L12.0102 10.7107L15.0406 13.7412L14.0305 14.7513Z"
        className="fill-red-500"
      />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <circle cx="11" cy="11.332" r="10.5" className="fill-gray-200" />
      <path
        d="M16 11.5073H11.7143V15.793H10.2857V11.5073H6V10.0787H10.2857V5.79297H11.7143V10.0787H16V11.5073Z"
        className="fill-black"
      />
    </svg>
  );
}

export default function AddDynamicField({
  name,
  lable,
  rules,
  required,
  onchange,
  defaultValue,
  placeholder,
}) {
  const [fields, setFields] = useState([{ id: 1 }]);

  const addField = () => {
    setFields([...fields, { id: Date.now() }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <AddDynamicFieldComponent>
      <div className="w-full max-w-md space-y-4 add-field">
        {fields.map((field) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormInput
              name={name}
              label={lable}
              rules={rules}
              required={required}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onchange={onchange}
            />
            <button
              type="button"
              onClick={() => removeField(field.id)}
              className="flex items-center justify-center p-0.5 hover:opacity-80 transition-opacity"
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="flex items-center justify-center p-0.5 hover:opacity-80 transition-opacity"
        >
          <AddIcon />
        </button>
      </div>
    </AddDynamicFieldComponent>
  );
}
