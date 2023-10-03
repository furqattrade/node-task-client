import Button from "../../components/Button"
import { Loader } from "../../components/Loader"
import Table from "../../components/Table"
import useApiMutation from "../../hooks/useApiMutation"
import useGeneralAPIQuery from "../../hooks/useGeneralQuery"
import { queryClient } from "../../main"
import { ITask } from "../../types/task"
import { formatDate } from "../../utils/formatDate"
import QueryHook from "../../utils/queryHook"
import {useState, useEffect} from "react"
import { toast } from "react-toastify";

interface Props{
    setVisible:(visible:boolean)=>void
  }
export const TaskList:React.FC<Props> = ({setVisible}:Props) => {
    const {AddQueryParams, QueryParams}=QueryHook()
    const {id}=QueryParams
    const [deletingTaskId, setDeletingTaskId]=useState<string|undefined>(undefined)
    const tasks=useGeneralAPIQuery('/task')

    const deleteTask=useApiMutation(`/task/${deletingTaskId}`, "delete")
    const columns=[
        {
            title:"№",
            key:"ord"
        },
        {
            title:"Title",
            key:"title"
        },
        {
            title:"Description",
            key:"desc"
        },
        {
            title:"Deadline",
            key:"deadline"
        },
        {
            title:"Action",
            key:"action"
        },
    ]
    const editOrDeleteTask=(taskId:string, operation:"edit"|"delete")=>{
        if(operation==='edit'){
            if(id===taskId){
                return
            }else{
                AddQueryParams({id:taskId})
                setVisible(true)
            }
        }
        if(operation==='delete'){
            setDeletingTaskId(taskId)
        }
    }
    const data=tasks?.data?.data.map((item:ITask, i:number)=>{
        return  {
            ord:i+1,
            title:item?.title,
            desc:item?.description,
            deadline:formatDate(item?.deadline),
            action:<>
            <div className="flex gap-3">
                <Button onClick={()=>editOrDeleteTask(item?._id, "edit")}>Edit</Button>
                <Button disabled={deleteTask.isLoading} onClick={()=>editOrDeleteTask(item?._id, "delete")} className="dark:bg-red-700">Delete</Button>
            </div>
            </>
        }
    })
    useEffect(()=>{
        if(deletingTaskId){
            deleteTask.mutate({},{
                    onSuccess: () => {
                            setDeletingTaskId(undefined)
                            toast.success("Sucessfully deleted");
                            queryClient.invalidateQueries(["/task"])

                          },
                          onError: () => {
                            toast.error("Something went wrong");
                          },
            })
        }
    },[deletingTaskId])

    return tasks.isLoading?<Loader/>: <Table columns={columns} data={data?data:[]}/>
}