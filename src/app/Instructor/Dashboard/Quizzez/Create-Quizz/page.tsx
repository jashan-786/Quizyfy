"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'


const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

type qaType= {
question: string,
answer:string

}
async function postQuizz(questions:any) {

  const response= await axios.post("/api/quizz/pushQuestion",
      questions
  )
 console.log( "req send to push ques")
  console.log(response.data)
  
  }

export default function page(): React.ReactNode {

 




  let output:any= null;
   const [quizz, setQuizz]= useState<any>();
   const [selectedFile, setSelectedFile]= useState<File>()
   const [formData, setFormData]= useState<FormData>()

  useEffect(() => {
  } , [selectedFile])

  const handleOnChange= (event:any) => {
     const file= event.target.files[0]
     console.log(file)
     setSelectedFile(file);

     
    const formData = new FormData();
    formData.append('pdfFile', file);

    setFormData(formData)
    
     console.log(selectedFile)
     console.log(formData)
     
  }

  const handleClick= async () => {

 
    const dataRes= await fetch("/api/room", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => output= data.kwargs.content)
      .catch(error => console.error(error));

      const startIndex = output.indexOf('[');
      const endIndex = output.lastIndexOf(']') + 1; // Include the closing bracket
      
      // Step 2: Extract the JSON array as a string
      const jsonArrayString = output.substring(startIndex, endIndex);
      console.log(jsonArrayString)
      // Step 3: Parse the JSON string to get the array
      const questionsAnswers = JSON.parse(jsonArrayString);
      
      // Output the extracted array
      console.log(questionsAnswers);


     let c=0;
      const arr= questionsAnswers.map( (question:any) =>
       { return (
        <div key={c++}>
          <div>
        Question : {question.question}
        </div>
        <div>
        Answer : {question.answer}
        </div>
        </div>
        
      ) }) 
setQuizz(arr)
    
const questions= {
  "roomId": "1",
  "question": JSON.stringify(questionsAnswers)
}

postQuizz(questions)
  }


  return (
    <div>

    <input type='file' onChange={ handleOnChange}></input>
    {selectedFile && <p>Selected file: {selectedFile.name ?selectedFile.name : "null" }</p>}
    <button onClick={ () => handleClick()} className=' w-[100px] h-12 bg-slate-300 text-balck rounded-lg'>
     Submit
    </button>
    
  {
    quizz
    
  }


    
    </div>

  )
}