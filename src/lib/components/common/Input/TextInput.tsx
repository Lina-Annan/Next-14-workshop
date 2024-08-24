import { InputHTMLAttributes } from "react";

export interface BaseInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "type" | "onClick"
  > {}

export type TextInputProps = BaseInputProps & {
  label: string;
};

const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        {...props}
        className="p-2 mt-1 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
};

export default TextInput;
