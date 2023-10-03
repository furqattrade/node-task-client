import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/form/input";
import Textarea from "../../components/form/textarea";
import Button from "../../components/Button";
import Datepicker from "../../components/form/datepicker";
import QueryHook from "../../utils/queryHook";
import useApiMutation from "../../hooks/useApiMutation";
import { toast } from "react-toastify";
import {useEffect} from 'react'
import useGeneralAPIQuery from "../../hooks/useGeneralQuery";
import { queryClient } from "../../main";

export interface FormData {
  title: string;
  description: string;
  deadline: string;
}

interface Props{
  setVisible:(visible:boolean)=>void
}

export const CreateTaskForm: React.FC<Props> = ({setVisible}:Props) => {
  const {QueryParams} = QueryHook()
  const {id}=QueryParams
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<FormData>();
  const createTaskMutation =useApiMutation("/task","post")
  const updateTaskMutation=useApiMutation(`/task/${id}`,'patch')
  const getSingleTask=useGeneralAPIQuery(`/task/${id}`,{},{enabled:false})

  //effects
  useEffect(()=>{
    if(id){
      getSingleTask.refetch().then((data)=>{
       reset(data?.data?.data)
      })
    }
  },[id])

  //functions
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if(id){
      updateTaskMutation.mutate(data,{
        onSuccess: () => {
          toast.success("Updated successfully");
          setVisible(false)
          queryClient.invalidateQueries(["/task"])
          reset({})
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }) 
    }else{
      createTaskMutation.mutate(data,{
        onSuccess: () => {
                toast.success("Created successfully");
                setVisible(false)
                queryClient.invalidateQueries(["/task"])
                reset({
                  deadline:undefined,
                  description:undefined,
                  title:undefined
                })
                
              },
              onError: () => {
                toast.error("Something went wrong");
              },
      })
    }
  };





  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center flex-col items-center">
      <div className="mb-4 w-full">
        <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <Input
                    errorMessage={errors.title?.message}
                    label="Title"
                    type="text"
                    {...field}
                  />
                )}
              />
        </div>
        <div className="mb-4 w-full">
        <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Textarea
                    rows={5}
                    errorMessage={errors.title?.message}
                    label="Description"
                    {...field}
                  />
                )}
              />
           
        </div>
        <div className="mb-4 w-full">
        <Controller
                name="deadline"
                control={control}
                rules={{ required: "Deadline is required" }}
                render={({ field }) => (
                  <Datepicker
                  label="Deadline"
                  {...field}
                  value={watch("deadline")} 
                  errorMessage={errors.deadline?.message}
                  onChange={(e)=>field.onChange(e?.target?.valueAsDate)}
                  />
                )}
              />
        </div>

        <div className="mt-6 w-full">
          <Button
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
      </form>
    </div>
  );
};
