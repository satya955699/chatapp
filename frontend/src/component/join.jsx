import { Link, NavigationType } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Box, Divider, Input, Typography } from "@mui/material";
function join() {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");

  return (
    <div className=" w-full   h-screen flex justify-center items-center">
      <div className="   text-center  h-[39vh] bg-red-700 w-[30vw] ">
        <Typography variant="h3">Join us</Typography>
        <Divider></Divider>
        <div className=" p-5  bg-blue-400  ">
          <div>
            <Input
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="enter you name"
            ></Input>
          </div>
          <div>
            <Input
              onChange={(e) => {
                setroom(e.target.value);
              }}
              placeholder="enter you  room "
            ></Input>
          </div>
          <div className=" p-7">
            <Link onClick={e=>{(!name||!room)? e.preventDefault():null}} to={`/chat?name=${name}&room=${room}`}>
              <Button
                sx={{ backgroundColor: "green", color: "white" }}
                className=" p-4"
              >
                submit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default join;
