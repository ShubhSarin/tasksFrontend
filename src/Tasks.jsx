import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import Card from "./TaskCard";


const serverURL = import.meta.env.VITE_APP_SERVER_URL;

export default function Tasks(){
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getTasks = async () => {
        try {
            const response = await fetch(serverURL + "/tasks/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + localStorage.getItem("token"),
                },
            })
            const data = await response.json()
            console.log(data)
            setTasks(data); 
        }
        catch(error){
            setError(error.message)
        }
    }

    useEffect(() => {
        getTasks()
    }, []);

    const handleDelete = async (taskId) => {
        await fetch(serverURL + `/tasks/${taskId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token' + localStorage
            }
        });
        getTasks();
    }
    
    return(
        <div className="bg-slate-950 text-white">
            <div className="flex flex-row justify-between pt-5 pl-5 px-3">
                <h1 className="text-3xl font-bold">
                    Tasks
                </h1>
                <div className="flex flex-row">
                <p className="w-auto border-1 border-slate-600 rounded-[7px] py-1 px-5 hover:cursor-pointer transition delay-0 ease-in-out duration-300 hover:scale-105 mr-2" onClick={() => {
                    navigate('/newtask/')
                }}>New Task</p>
                <p className="w-auto border-1 border-slate-600 rounded-[7px] py-1 px-5 hover:cursor-pointer transition delay-0 ease-in-out duration-300 hover:scale-105 ml-2" onClick={() => {
                    logout()
                    navigate('/')
                    localStorage.removeItem("token")
                }}>Logout</p>
                </div>
            </div>
            <div className="h-[1.5px] w-full bg-slate-500 mt-3"></div>
            <div className="font-[Montserrat] ">
                <div className="flex flex-row m-3">
                {tasks.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="font-extrabold text-3xl">

                        No task found ☹️
                        </p>
                    </div>
                ) : (
                    tasks.map((task) => {
                        return(
                            <Card key={task.id} data={task} onDelete={() => handleDelete(task.id)} />
                    )
                })
                )}
                </div>
            </div>
        </div>
    )
}

function logout(){
    const request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token"),
        }
    }
    return fetch(serverURL + "/authentication/logout/", request)
}

