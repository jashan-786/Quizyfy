// pages/api/quiz/pushQuestion.js

import { pusherServer } from "@/utils/creatingquizz";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { NextResponse } from "next/server";


export async function POST(req:Request, ctx:NextPageContext){

  


try{
 console.log("her")
    const body = await req.json();
    const question= body.question
    console.log(body)

    const pServer= await pusherServer
    // const user= await getSession( ctx)
await pServer.trigger(`quizz-room-1`, 'new-question', {
    question,
  });
  console.log("her  22 " )
return  new Response( " question send")

}
catch(err){
console.log(err)
return new Response( "question not send")
}

}