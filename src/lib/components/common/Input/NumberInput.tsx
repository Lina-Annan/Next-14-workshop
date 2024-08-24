import { BaseInputProps } from "./TextInput";

type NumberInputProps = BaseInputProps & {
  label: string;
};

const NumberInput = ({ label, ...props }: NumberInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        {...props}
        type="number"
        className="p-2 mt-1 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      />
    </div>
  );
};

export default NumberInput;
