import {getPusherClientInstance ,getPusherServerInstance}  from "@/utils/pusher";
import Pusher from "./pusher";







export const secretCode= Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 + "";

export const pusherServer= getPusherServerInstance();
export const pusherClient=  getPusherClientInstance();
const channelName = "quiz-0";

export const creatingquizz = async () => {
  // creating channel

  const res = await pusherServer.get({ path: `/channels/${channelName}` });
  let present=true;
  if (res.status === 200) {
    const body = await res.json();
    console.log(body)
      body.occupied ?present = false : present = true;
  }

if(!present){
pusherServer.trigger(channelName, "my-event", {
    message: "hello students"
  });
}
else{
  pusherServer.trigger(channelName, "my-event", {
    message: "hello students"
  });
}



  

  // You can add additional logic here, such as checking if the channel already exists
  // For demonstration purposes, we'll just create the channel

};

export const joinReq=  ()=> {
console.log("asking student to join")
pusherServer.trigger(channelName , "join-room",{
  message: "student please join the room"
})

}

export const channellExist = (channelName) => {
 
  try {
   


    //  console.log("channel added" + pusher.channels.add("heh",pusher))
     console.log("all cahnnels"+ pusherServer.allChannels())
     const res= pusherServer.channels.find(channelName)
     console.log(res+ "hi")
    if (res) {
      
      return true;
    } else {
   
      return false;
    }
  } catch (error) {
    console.error("Error checking channel:", error);
   
  }
};

export const joinQuizz= (code , channelName) =>{

    if( code === secretCode){
        
        // channel.bind('my-event', function(data) {
        //   console.log('Received data:', data);
        // });

    }

}
