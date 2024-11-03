import { DocumentItem } from "@/utils/Intefaces";
import { init,pinecone } from "@/utils/pineconeClient";
import { PineconeRecord, RecordMetadata, ScoredPineconeRecord } from "@pinecone-database/pinecone";
import axios from "axios";
import { version } from "react";
import { any } from "zod";
import { performSemanticSearch } from "../embedding/route";
import { metadata } from "@/app/layout";



export async function POST(req:Request) {


    const input= await req.json();
    console.log(input.msg)
    try{
    const res : ScoredPineconeRecord<RecordMetadata> [] | undefined | null= await performSemanticSearch(input.msg);
    const messages=[]

    if(res?.length != undefined ){
    for( let i=0 ;   i < res.length  ; i++){
      messages.push(  res[i]?.metadata?.text  );

    }

  }
    
    // request to model 
  
    // const resFromModel= await axios.post( "https://rag.hsiskesks.workers.dev/", 
      
    //   JSON.stringify({
    //   messages
    // }))

//     const data= resFromModel.data;
//       console.log( "Message send in post")
// console.log(data)


    return new Response(JSON.stringify({messages}))
    }
    catch ( err) {
  
      console.log( "me " + err)
    }
  
  
  }

