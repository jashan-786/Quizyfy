"use client"
import React from 'react'
import axios from "axios"

async function getQuizz() {

  const res= await axios.get("/quizz")
 return res.data;


}

export default async function Quizz() {


  const quizz= await getQuizz();


  return (
  <>
    <div className='flex justify-center text-5xl'> Quizz</div>
    <div>



    </div>
    </>
  )
}
