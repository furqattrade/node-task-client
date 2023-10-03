import { ChangeEventHandler } from "react";
import { formatDate } from "../../../utils/formatDate";

  interface DatepickerProps  {
    id?: string;
    errorMessage?:string;
    label: string
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value:string
    
  }
  
  const Datepicker: React.FC<DatepickerProps> = ({ onChange,id, label, errorMessage ,value, ...props}):JSX.Element => {
    return (
      <>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input {...props} value={formatDate(value)} onChange={onChange} datepicker-orientation="bottom right" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </>
    );
  };
  
  export default Datepicker;