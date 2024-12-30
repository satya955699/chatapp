import { Button, Input, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import io from "socket.io-client"
const socket=io.connect("http://localhost:5000/")
const name=prompt("enter you name")
alert(name)

function chat(){
    const [chat,setchat]=useState([])
  let [message,setmessage]=useState({
    value:"",username:""
  })
    const change=(e)=>{
        setmessage({value:e.target.value,username:name})
    }
    const sendmessage=()=>{
        socket.emit("sendmessage",message)
        console.log(message.value.length)
        setmessage({
          value:"",username:""
        })
    }  
    const delate=(data)=>{
      socket.emit("delate",data)

    }
    const error=()=>{

    }
    useEffect(()=>{
      

      socket.emit("getchathistory")
     socket.on("chathistory",(data)=>{
      setchat(data)
     })
      socket.on("recive",(data)=>{
        // console.log(data)
        console.log(chat,data)
        setchat((priv)=>{
          return [...priv,data]
        }
      )})
      return ()=>{
        socket.off("chathistory")
        socket.off("recive")
      }
     
      },[sendmessage,socket])
   


    return(
        <div>
          <div className=" flex justify-center items-center">
            <div>
                <Typography className=" text-center" variant="h4"> Chatt app {name}</Typography>
                <div  style={{boxShadow:"2px 3px 4px black", overflowY:"scroll",scrollbarWidth:"none"}} className=" p-4 bg-gray-500 w-[80vw] h-[83vh]">     
                      {chat.map((msg,index)=>{
                        return <div className={` ${msg.username===name ?"float-right bg-orange-300":"float-left  bg-orange-400"}  rounded-xl break-words overflow-hidden  max-w-[30vw]  my-3  clear-both  inline-block  p-2  font-bold`}>
                         <h6 className=" font-mono" >{msg.username===name?"":msg.username}</h6>
                          <hr />
                         <Typography id={index} className=" font-bold" variant="h5" >{msg.value}   </Typography>
                         <Button id={index} onClick={()=>delate(index)}><button>delate</button></Button>
                       </div>
                       thank you
                      })}
                </div>
                <div className=" flex  my-2">
                    <input value={message.value}  onChange={change} className=" p-1  border-4  rounded-xl border-green-500 w-full" placeholder="text here" type="text" />
                    <Button  onClick={message.value.length>0?sendmessage:error}  className=" rounded-xl"   color="success" variant="containd" >
                        Send
                    </Button>
                    
                </div>
            </div>

            
          </div>
        </div>
    )
}
export default  chat