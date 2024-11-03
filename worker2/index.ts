import { CloudflareWorkersAIEmbeddings } from "@langchain/cloudflare";
import { Ai, ExportedHandler } from "@cloudflare/workers-types";
import { BaseAiTextGenerationModels } from "@cloudflare/workers-types";

export interface Env {
    AI: Ai;
  }
  
  export default {
    async fetch(request: Request, env : Env): Promise<Response> {
      
      if(request.method == "POST"){

        const body= await request.json();
      const messages = [
        { role: "system", content: "You are a friendly assistant" },
        {
          role: "user",
          content: "give me 10 iportant question from these lines given to you on elephant in from od array questions and answers",
        }
      ];

      messages.push(body.messages)
      const response = await env.AI.run("@cf/google/gemma-2b-it-lora", { messages });
     
  
      return new Response(JSON.stringify({response}));
    }
    else{

      return new Response( "senf post method")
    }
  
  }} 