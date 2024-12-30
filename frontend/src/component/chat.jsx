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
        console.log("click")
        setmessage({
          value:"",username:""
        })
    }  
    const delate=(data)=>{
      socket.emit("delate",data)

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
                      {/* <div className="  max-w-[30vw] my-3  clear-both  inline-block float-right bg-orange-400 p-2  font-bold">
                        <Typography className=" font-bold" variant="h5" >jasdfajkl </Typography>
                      </div>
                      <div className="  max-w-[30vw] my-3  clear-both  inline-block float-left bg-orange-400 p-2  font-bold">
                        <Typography className=" font-bold" variant="h5" >  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim assumenda repellendus fugiat doloremque sint quisquam rem quasi harum cupiditate amet! </Typography>
                      </div> */}
                      {chat.map((msg,index)=>{
                        return <div className={` ${msg.username===name ?"float-right bg-orange-300":"float-left  bg-orange-400"}  rounded-xl break-words overflow-hidden  max-w-[30vw]  my-3  clear-both  inline-block  p-2  font-bold`}>
                         <Typography id={index} className=" font-bold" variant="h5" >{msg.value}   </Typography>
                         <Button id={index} onClick={()=>delate(index)}><button>delate</button></Button>
                       </div>
                      })}
                </div>
                <div className=" flex  my-2">
                    <input value={message.value}  onChange={change} className=" p-1  border-4  rounded-xl border-green-500 w-full" placeholder="text here" type="text" />
                    <Button onClick={sendmessage} className=" rounded-xl"   color="success" variant="containd" >
                        Send
                    </Button>
                    
                </div>
            </div>

            
          </div>
        </div>
    )
}
export default  chat