interface ButtonProps  {
    disabled?: boolean;
    children?:string
    type?:"submit"|"button"|"reset",
    onClick?:()=>void,
    className?:string
  }
  
  const Button: React.FC<ButtonProps> = ({ className,onClick,type,disabled=false, children,...props}):JSX.Element => {
    return (
      <>
    <button onClick={onClick} {...props} type={type} disabled={disabled} className={`w-avto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800  ${className} `}>
        {children}
    </button>
      </>
    );
  };
  
  export default Button;