// utils/pusher.js

import Pusher from "pusher-js";
import * as Serverp from "pusher";

let pusherClient = null;
let pusherServer = null;

export const getPusherServerInstance = () => {

  if (pusherServer == null) {
    if(typeof global !== 'undefined' && !global.pusherServer){
      console.log("Pusher server created")    
      global.pusherServer = new Serverp({
          appId: "1808262",
          key: "e4d4dff9a32aff7a47c9",
          secret: "40e94c8413d89b20abba",
          cluster: "us2",
          useTLS: true
        });

        pusherServer = global.pusherServer;
    
    }
    else{
      pusherServer= global.pusherServer;
    }
  }else{

  console.log("Pusher server already there");
  }
  return pusherServer;
};

export const getPusherClientInstance = () => {
  if (pusherClient == null) {
    if( typeof global !== 'undefined' && !global.pusherClient){
      console.log("Pusher client created")
      global.pusherClient = new Pusher('e4d4dff9a32aff7a47c9',
        
        
        {
          userAuthentication:{
            endpoint:"/api/pusher/auth"
          },
        
      
        cluster: "us2",
         authEndpoint: "/api/pusher/auth",
       
         
      });
      pusherClient=global.pusherClient
    }else{
      return global.pusherClient
    }
  }

 console.log("Pusher client already created")
  return pusherClient;
};
