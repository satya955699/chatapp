// import expres from "express";
// const router=expres.Router()
//  router.get("/",(req,res)=>{
//     res.send("server is up running ")
    
//  })

// export default router
import express from "express"
const router=express.Router()
router.get("/",(req,res)=>{
   res.send("server is runnig")
})
export default router