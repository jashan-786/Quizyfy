import { pusherServer } from "@/utils/creatingquizz";
import { useSession } from "next-auth/react";
export async function POST(req:Request) {

    
  
        
    console.log("authorization hit")

    //  // Reads the request body as JSON
    //  const body = await req.json();
    //  console.log(body);
 
    // //  // Extracts values directly from the JSON object
    //  const socketId = body.socket_id;
  

    const data = await req.text();
 
    console.log(data)
    const [socketId, channel_name] = data
      .split("&")
      .map((str) => str.split("=")[1]);
    // // && (user.role === 'professor' || user.role === 'student')

    // if (channel_name.startsWith('private') ) {
           let channelname = "private-quizz-1"
    console.log("im inside ")

    const authResponse =  pusherServer.authorizeChannel(socketId, channelname);
    console.log(authResponse)
    return new Response(JSON.stringify(authResponse));

    

    // return new Response("Not a right person to intilize a room")

    
}