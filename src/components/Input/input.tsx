import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  registerInput: string;
  labelText: string;
  register: UseFormRegister<any>;
  placeholder: string;
  type: string;
  errors: FieldErrors<any>;
}

export default function Input({
  labelText,
  placeholder,
  registerInput,
  errors,
  type,
  register,
}: InputProps) {
  return (
    <div className="flex flex-col relative">
      <label htmlFor={labelText} className="text-white text-xl font-medium">
        {labelText}
      </label>
      <input
        id={labelText}
        className="bg-gray-300 placeholder-black text-lg rounded-lg p-2"
        type={type}
        placeholder={placeholder}
        {...register(registerInput)}
      />
      {!!errors[registerInput]?.message ? (
        <span className="absolute bottom-[-25px] text-red-500 animate-menu-open">
          {errors[registerInput]?.message as string}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
