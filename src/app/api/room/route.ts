
import { creatingquizz, joinQuizz, joinReq } from "@/utils/creatingquizz";
import getQuestion from "@/utils/lanchain";
import { Console } from "console"

export async function GET(request: Request) {

      
      // creating quizz
     const res=  creatingquizz();
    // sunscribing quizz
    
    const resp= joinReq();
    
    return new Response("working")
    
}

export async function POST(request: Request) {

      

   const body= await request.formData()
   const file= body.get("pdfFile")
   try{
    const res= await getQuestion(file)
    console.log("response from get questions")
   console.log(res)
   return new Response(JSON.stringify(res))
   }
   catch(err){
      console.log( "server err")
      return new Response("not working")

   }
   
}