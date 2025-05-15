import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'
import { Button } from "@/components/ui/button"


export default function Landing() {
    const navigate = useNavigate();
    return(
        <div className="flex flex-col text-center items-center justify-center h-screen w-screen bg-slate-950 text-slate-300">
            <div>
                <h1 className="text-6xl">Task Manager</h1>
                <div className="my-5 h-[40px] flex flex-row justify-around items-center">
                    {/* <Button variant="outline" onClick={() => {
                        navigate("/login");
                    }} >Login</Button>
                    <Button variant="outline" onClick={() => {
                        navigate("/register");
                    }}>Register</Button> */}
                    <div className="w-[50%] flex justify-center">
                    <h2 className="w-auto border-1 border-slate-600 rounded-[7px] py-1 px-5 hover:cursor-pointer transition delay-0 ease-in-out duration-300 hover:scale-125" onClick={() => {
                        navigate("/login");
                    }}>Login</h2>
                    </div>
                    <div className="w-[50%] flex justify-center">
                    <h2 className="w-auto border-1 border-slate-600 rounded-[7px] py-1 px-5 hover:cursor-pointer transition delay-0 ease-in-out duration-300 hover:scale-125" onClick={() => {
                        navigate("/register");
                    }}>Register</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
