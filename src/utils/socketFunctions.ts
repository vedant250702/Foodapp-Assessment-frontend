import {io} from "socket.io-client"

export const socket:any=io(import.meta.env.VITE_BACKEND_BASEURL)

export const socketEmit=(event:string,payload:Object)=>{
    socket.emit(event,payload)
}

