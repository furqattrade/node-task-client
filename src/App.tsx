import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Auth from "./components/Auth";
import GeneralInfoContextProvider from "./context/GeneralInfoProvider";

function App() {


  
  return (
    <div className="flex flex-col items-center">
      <GeneralInfoContextProvider>
      <Auth>
      <section className="bg-gray-50 dark:bg-gray-900 w-[100%] h-[100vh]">
      <ToastContainer position="top-center" />
      <Outlet />
      </section>
      </Auth>
      </GeneralInfoContextProvider>
    </div>
  );
}

export default App;
