import axios from "axios";


export async function GET(req:Request) {

    const data = await axios.get("https://rag.hsiskesks.workers.dev")
console.log(data.data.response)
return new Response("cool")
    
}