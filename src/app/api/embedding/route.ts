import { DocumentItem } from "@/utils/Intefaces";
import { init,pinecone } from "@/utils/pineconeClient";
import { PineconeRecord } from "@pinecone-database/pinecone";
import axios from "axios";
import { version } from "react";
import { any, array } from "zod";
import { PCA } from 'ml-pca';


// Adjusting the function to specify that it satisfies the expected handler


export async function performSemanticSearch(query : string | null) {

 
 if (query == null )
  return ;




  const userInput=  query.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\n/g, '').trim().toString() 
  const arr = userInput.split(" "); 

  const index = pinecone.Index('test2'); 
  const queryEmbedding = await getQueryEmbedding(arr);

  const res =queryEmbedding.data.embeddingsResult

  // const pca = new PCA(res);

  // const reducedVectors = pca.predict(res, { nComponents: 384 });

  // const flatReducedVectors =  Array.from(reducedVectors).flat();

  try{
  const queryResult = await index.query({
    topK: 20, // Top 5 most relevant embeddings
    vector: res[0],
    includeValues: true,
    includeMetadata: true,
  // Return metadata along with results
  });


  return queryResult.matches;

}catch(err){
console.log("hey" + err)
}
  // Returns the top 5 results
}



export async function storeEmbeddings(ids: string[], embeddings: number[][], texts: string[]) {

 
  const index = pinecone.Index('test2'); // Replace with your index name



  const vectors : PineconeRecord[] = embeddings.map((embed , index) => ({
     
      "id":ids[index],
      "values": embed,
      "metadata": {
        text:texts[index]
      }
  } ));

 
 const res= await index.upsert(  vectors.map( (v: PineconeRecord) => {return v }))

 return 

}


async function  getQueryEmbedding(alphabeticTexts : string []) : Promise<any>  {
  
  
  const output=   await axios.post("https://my-embedding-worker.hsiskesks.workers.dev",
    
    (alphabeticTexts)
   
     
   )

   return output;
}



export async function GET(req:Request) {


  const url=  new URL(req.url);
  const searchParams : string | null =url.searchParams.get("message");
  
  try{
  const res= await performSemanticSearch((searchParams));
  }
  catch ( err) {

    console.log( "me " + err)
  }

  return new Response("working")
}


export async function POST(req: Request, res: Response) {

  await init();

  try{

  const json = await req.json();
   

  const texts = json.map((item: DocumentItem) => {
    // Use a regular expression to replace non-alphabetic characters
    return item.pageContent.replace(/[^a-zA-Z\s]/g, '').replace(/\n/g, '').trim().toString() // Keeps only letters and spaces
});

const alphabeticTexts = texts.filter( (text:string)=> text.length > 0);



 const output= await getQueryEmbedding(alphabeticTexts);
 

    const res= await output.data.embeddingsResult;
  
  const ids = res.map(( _embeds:any , index: number) => `tex- ${ index} ` + "")
  
 

  // try{
  // const result= await storeEmbeddings(ids, res, alphabeticTexts);
  
  

  // } catch( err){

  //   console.log(err)
  // }
  // return new Response(output.data.embeddingsResult);

  return new Response( JSON.stringify ({ids , res, alphabeticTexts}))
}
  catch(err){

    console.log("server error from embeddings")
  }

 

}


