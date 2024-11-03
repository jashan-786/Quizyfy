import { CloudflareWorkersAIEmbeddings, clu } from "@langchain/cloudflare";
import { Ai } from "@cloudflare/workers-types";
import {DocumentItem} from "@/utils/Intefaces"
import { number, string } from "zod";
export interface Env {
  AI: Ai; // Make sure `Ai` is the correct type for your AI binding
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {

    const data:string[] = await request.json();

  

    console.log(data)
    const embeddings = new CloudflareWorkersAIEmbeddings({
      model: "@cf/baai/bge-small-en-v1.5",
      binding: env.AI, // Use AI binding from the environment
    });
    

    if (request.method == "POST") {
    


      
    const inp = {
      text:data
    };

    try {
      // Call embedDocuments if 'text' is an array
      const embeddingsResult = Array.isArray(inp.text)
        ? await embeddings.embedDocuments(inp.text)
        : await embeddings.embedQuery(inp.text);

      // Send the result back to the client
       return new Response(JSON.stringify({ embeddingsResult }));
    } catch (error) {
      console.error('Error embedding text:', error);
      new Response( JSON.stringify ({error: 'Internal Server Error'}) );
    }


  }
  else{

    return new Response("it is a get request, {status:200}")
  }
  }
} ;
