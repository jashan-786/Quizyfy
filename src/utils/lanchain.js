
//@ts-nocheck
// import   from "langchain";

import { TokenTextSplitter } from "langchain/text_splitter";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ChatCloudflareWorkersAI, CloudflareWorkersAI ,CloudflareWorkersAIEmbeddings} from "@langchain/cloudflare";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { Document, Page, GlobalWorkerOptions } from 'react-pdf';

import  { ChatPromptTemplate} from "@langchain/core/prompts"

//@ts-nocheck



import fs from "fs";
import { env } from "process";
import axios from "axios";
import { storeEmbeddings } from "@/app/api/embedding/route";





  // Wait for PDF loading to complete
 
export default async function getQuestion (file) {


  
  // Define the path to your PDF document
 // const pdfPath = 'C:/Users/jp/Downloads/resume.pdf';

  // Read the PDF content
  
  // Load the PDF document using WebPDFLoader
    const loader = new WebPDFLoader(new Blob([file], { type: 'application/pdf' }));


   const docs = await loader.load();

  
  // Optional: Split the document into smaller chunks (adjust chunk size as needed)
  const splitter = new RecursiveCharacterTextSplitter({

    chunkSize: 600,
    chunkOverlap: 100,
  });

const ans=await splitter.splitDocuments((docs))

console.log(ans)
//creating ebeddings 
const result= await axios.post("http://localhost:3000/api/embedding",
 ans
)
console.log(result.data)
// storing embeddings
  await storeEmbeddings(result.data.ids, result.data.res, result.data.alphabeticTexts);
  
  


console.log( " im here")




//making semantic search

const user= {"msg": "importatn 10 lines of the content provided"}
const resultSemantic= await axios.post("http://localhost:3000/api/vector",
  user
 )

 const outputSemantic= resultSemantic.data;


 const systemTemplate = "You are a helpful assistant that generates an array of 10 questions and answers from the given content. Please format the output as a JSON array containing only the questions and answers without any additional text or formatting.Dont include sentences like : I'm happy to help!\n\nBased on the provided content, I've generated an array of 10 questions and answers for you.  Here is the content: {input_content}.";
 const humanTemplate = "{text}"

const chatPrompt = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["human", humanTemplate]

]);

const formattedChatPrompt = await  chatPrompt.formatMessages({
  input_content: outputSemantic,
  text: "I love elephants."
});

console.log(formattedChatPrompt)


const model = new ChatCloudflareWorkersAI({
  model: "@cf/meta/llama-2-7b-chat-int8", // Default value
  cloudflareAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  cloudflareApiToken: process.env.CLOUDFLARE_API_TOKEN,
  // Pass a custom base URL to use Cloudflare AI Gateway
  // baseUrl: `https://gateway.ai.cloudflare.com/v1/{YOUR_ACCOUNT_ID}/{GATEWAY_NAME}/workers-ai/`,
});



try{
const res= await model.invoke(formattedChatPrompt);

console.log(res)


return res;
}
catch(err){
  console.log(err)
}



  

  // const summaryTemplate = `
  //   Please summarize the following document and generate 10 open ended, challenging, and thought-provoking questions:

  //   --------
  //   {text}
  //   --------
  //   Total output will be a summary of the document and 10 open ended questions
  // `;

 


  // const chain = Langchain.chain()
  // .append(Langchain.step.prompt(questionPrompt, inputDocument))
  // .append(Langchain.step.llm(llm));

 
  // const result = await chain.run();
  
 

}