export interface ITask{
    _id:string,
    title:string,
    description:string,
    deadline:string,
    user:{
        email:string
    }
}