import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const serverURL = import.meta.env.VITE_APP_SERVER_URL;

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = async () => {
            try{
                const isAuthenticated = await checkAuth()
                if(isAuthenticated){
                    navigate('/tasks/')
                }
            }
            catch(err) {
            }
        };
        checkAuthentication();
    }, [navigate])
    
    return(
    <div className="bg-slate-950 font-[Montserrat] flex flex-col items-center justify-center h-screen">
        <h1 className="font-bold text-5xl mb-10 text-white">LOGIN</h1>
    <form>
        <input className="text-white border-1 border-zinc-600 rounded-xl p-3 w-full m-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="text-white border-1 border-zinc-600 rounded-xl p-3 w-full m-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="border-5 border-zinc-600 text-white rounded-xl p-2 m-2 w-full hover:cursor-pointer transition delay-0 ease-in-out duration-300 hover:scale-105" type="submit" onClick={(e) => {
            e.preventDefault();
            if (username === "" || password === "") {
                setError("Please fill in all fields");
            } else {
                loginRequest(username, password)
                .then(
                    (data) => {
                        navigate("/tasks/");
                    }
                )
                .catch((error) => {
                    setError(error.message);
                });
            }
        }}>Login</button>
        {error && (
            <div className="text-red-500 mt-2 w-full flex justify-center">{error}</div>  
        )}
    </form>
    </div>
    )

}

async function checkAuth(){
    const request = {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem("token"),
        },
    }
    try{
        const response = await fetch(serverURL + "/authentication/check/",request)
        if(response.status === 200){
            return true;
        } else {
            throw new Error("Not logged in");
        }
    }
    catch(err) {
        throw new Error(err)
    }
}

function loginRequest(username, password){
    try{
        return fetch(serverURL + "/authentication/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw new Error("Invalid username or password");
            } 
        })
        .then((data) => {
            localStorage.setItem("token", data.token);
            return data;
        })
    } catch (err) {
        throw err
    }
}