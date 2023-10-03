import { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { CreateTaskForm } from "./form";
import { TaskList } from "./list";
import {useContext} from 'react'
import GeneralInfoContext from "../../context/GeneralnfoContext";
import QueryHook from "../../utils/queryHook";

export function Tasks() {
	const token = localStorage.getItem("token");
	const [visible, setVisible] = useState(false);
  const [general, setGeneral] = useContext<any>(GeneralInfoContext)
  const {navigate}=QueryHook()
  const logout=()=>{
    localStorage.removeItem("token")
    navigate("/")
    setGeneral({})
  }
	return (
		<div className="m-10">
      <div onClick={logout} className="flex justify-end text-white mb-4 text-lg font-bold hover:text-primary-600 cursor-pointer">
        Logout
      </div>
			<div className="flex items-center justify-between my-3">
				<h1 className="text-2xl text-white font-semibold mb-4">User email: {general?.user?.email}</h1>
				{token && (
					<Button onClick={() => setVisible(!visible)}>Create task</Button>
				)}
			</div>

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
				<TaskList setVisible={setVisible} />
			</div>
			<div className="w-full h-full">
				<Modal setVisible={setVisible} visible={visible} title="Create task">
					<CreateTaskForm setVisible={setVisible} />
				</Modal>
			</div>
		</div>
	);
}
