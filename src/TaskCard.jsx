import { CiTrash, CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat'

const serverURL = import.meta.env.VITE_APP_SERVER_URL;

export default function Card({data, onDelete}){
    let formattedDate = new Date(data.updated_at)
    formattedDate = dateFormat(formattedDate, "h:MM TT mmmm dS, yyyy")
    const navigate = useNavigate()
    return(
        <div className="bg-slate-700 p-3 rounded-xl text-white m-3 group">
            <div className="flex flex-row justify-between">
                <CiEdit className="opacity-0 hover:cursor-pointer group-hover:opacity-100 transition delay-0 ease-in-out duration-300 hover:scale-150" onClick={async () => {
                    await navigate('/edit/', {state: {id: data.id}})
                }}/>
                <h1 className="font-bold text-center">{data.title}</h1>
                <CiTrash className="opacity-0 group-hover:opacity-100 hover:cursor-pointer transition delay-0 ease-in-out duration-300 hover:scale-150" onClick={onDelete}/>
            </div>

            <div className="h-[1px] w-full bg-zinc-500"></div>
            <div className="min-h-[9vh] w-50">
                <p className="py-2">{data.description}</p>
            </div>
            <div className="h-[1px] w-full bg-zinc-500"></div>
            <footer className="text-[10px]">Updated at: {formattedDate}</footer>
        </div>
    )
}
