import GeneralInfoContext from "../../context/GeneralnfoContext";
import useGeneralAPIQuery from "../../hooks/useGeneralQuery";
import QueryHook from "../../utils/queryHook";
import {useEffect,useContext} from 'react'

interface Props  {
    children:JSX.Element
  }
  
  const Auth= ({ children}:Props):JSX.Element => {
    const [general, setGeneral] = useContext<any>(GeneralInfoContext)
    const token=localStorage.getItem("token")
    const getUser=useGeneralAPIQuery("/auth",{},{enabled:false})
    const {navigate}=QueryHook()
    useEffect(()=>{
        if(!token){
            navigate("/")
            return
        }else{
            getUser.refetch().then(data=>{
                setGeneral({...general,user:data.data?.data?.user})
                navigate("/tasks")
            })
        }
    },[getUser.isFetched])
   
    return children
  };
  
  export default Auth;