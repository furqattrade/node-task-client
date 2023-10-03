interface ModalProps  {
    children?:JSX.Element
    title?:string 
    visible?:boolean,
    setVisible:(visible:boolean)=>void
}
  
  const Modal: React.FC<ModalProps> = ({ title, children, visible, setVisible}):JSX.Element => {
    return (
      <>
{
    visible&&
    <div    className="fixed flex justify-center top-[40px] left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative  w-full max-w-2xl max-h-full">
        <div className="relative max-h-[90vh] overflow-scroll bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <button onClick={()=>setVisible(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                {children}
            </div>
            
        </div>
    </div>
</div>
}


      
      </>
    );
  };
  
  export default Modal;