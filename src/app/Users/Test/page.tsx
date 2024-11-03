"use client"

import { pusherClient } from '@/utils/creatingquizz';
import React, { useEffect, useState } from 'react'
import * as PusherTypes from 'pusher-js';


const  subQuizz= async  () => {

  console.log("fetching quizz")
//  try{
//   pusherClient.signin()
//  }catch(err){
//   console.log(err)
//  }

try{

  // var channel:PusherTypes.Channel =  pusherClient.subscribe(`private-quizz-room-1` );
  var channel1:PusherTypes.Channel =  pusherClient.subscribe(`quizz-room-1`);

  console.log(channel1)
  channel1.bind('new-question', function(data : any) {
    
    console.log(JSON.stringify(data));
  });
  channel1.bind('join-room', function(data :any) {
   alert(JSON.stringify(data))
 });
}
catch(err){
  console.log(err)
}
 }

 
export default function page() {

    

    const [question, setQuestion]= useState<{question:string}>( {question: ""});
    useEffect(  ()=>{

      subQuizz()

         

    }, [])

  return (
    <div>User Test</div>
  )
}
