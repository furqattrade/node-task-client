
  interface TextareaProps  {
    id?: string;
    errorMessage?:string;
    label: string
    name: string
    rows?:number
    
  }
  
  const Textarea: React.FC<TextareaProps> = ({ rows,id, name, label, errorMessage , ...props}):JSX.Element => {
    return (
      <>
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <textarea
                  name={name}
                  rows={rows}
                  id={id}
                  className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-[200px] sm:h-auto shadow-sm sm:text-sm"
                  {...props}
                />
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </>
    );
  };
  
  export default Textarea;