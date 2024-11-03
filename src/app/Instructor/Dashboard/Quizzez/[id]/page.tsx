"use client"
import axios from "axios";
import { ReactNode } from "react";

export default function quizz(): ReactNode{

    let count=1;

const questions= {
    "roomId": "1",
    "question": "question1"
}

async function postQuizz() {

    const response= await axios.post("/api/quizz/pushQuestion",
        questions
    )
   console.log( "req send to push ques")
    console.log(response.data)
    
    }
    

return (
<>
<button onClick={ 
    () =>{
       postQuizz()
    
    }

}>

Send questions

</button>


</>
)





}