const functions = require('firebase-functions')
//const app = require('./app')

const apikey="53c96255-9778-49a4-8993-7550935b3526";
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion, Image,Payload,LinkOutSuggestion } = require('dialogflow-fulfillment');
const MAIN_MENU = [
    {
      title: "HPV가 궁금하신가요?", // What is HPV?
      imageUrl: "https://trialchatbotbbac.blob.core.windows.net/images/malaysia_1.jpg",
      text: "",
      buttonText: "Find out more",
      buttonUrl: "HPV가 궁금하신가요?",
 
    }, {
      title: "예방에 대해 궁금하신가요?", // Curious about prevention?
      imageUrl: "https://trialchatbotbbac.blob.core.windows.net/images/malaysia_3.jpg",
      text: "",
      buttonText: "Find out more",
      buttonUrl: "예방에 대해 궁금하신가요?",
     
    }
  ];
const express = require('express');
const app = express();
app.use( express.json() );

app.get('/', (req, res) => processWebhook( req, res ));



var processWebhook = function( request, response ){
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));
    const agent = new WebhookClient({ request, response });
    // An action is a string used to identify what needs to be done in fulfillment
    let action = request.body.queryResult.action; // https://dialogflow.com/docs/actions-and-parameters
    console.log('Actions = '+ JSON.stringify(action));

  //  let query = request.body.result.resolvedQuery;

    // Parameters are any entites that Dialogflow has extracted from the request.
   // const parameters = request.body.queryResult.parameters; // https://dialogflow.com/docs/actions-and-parameters

    // Contexts are objects used to track and store conversation state
  //  const inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts

  function welcome(agent){
    //agent.add(new LinkOutSuggestion({"name": "Website", "url": "https://assistant.google.com"}));
  agent.add(`안녕! 내 이름은 Sara. HPV, 관련 질병 및 귀하를 보호하기 위해 할 수있는 것에 관해 궁금한 점이 있으면 도와 드리겠습니다. 그래서, 어떻게 도울 수 있니?`);
agent.add(`가다실 ® 9 주요 안전성 정보에 대한 자세한 내용은 여기: http://dev.ogilvyone.com.sg/marcusk/MSD/SSI/index.html`);
MAIN_MENU.forEach(menuItem => {
    console.log(menuItem);
  agent.add(new Card(menuItem));
});}
function menuHandler(agent) {
const fulfillmentMessages= request.body.queryResult.fulfillmentMessages;
   
  /*  const fulfillmentMessages =  req.map(m => {
        if (!m.platform)
            m.platform = 'PLATFORM_UNSPECIFIED';
        return m;
    }); */
    const payloadImage = fulfillmentMessages.find(x => x.payload && x.payload.images).payload;
     const payload = fulfillmentMessages.find(x => x.payload && x.payload.menuOptions).payload;
	const msgText = fulfillmentMessages.filter(x => x.text !== undefined);
    const image = fulfillmentMessages.find(x => x.image && x.image.imageUri);
    var images=[];
  

    // let relatedTopics = `Anything else I can help you with? Here are some related topics:\n`;
    //let relatedTopics = `내가 너를 도울 수있는 다른 것? 관련 주제는 다음과 같습니다:\n`;
    images = fulfillmentMessages.find(x => x.image && x.image.imageUri);
   


 /*     if(images/*&&!imageInText) {    
        for(let k = 0; k < images.length; k++)          {
        //agent.add(JSON.stringify(images.menuOptions));
        agent.add(new Image(images[k].image.imageUri));}    }*/
    
    msgText.forEach(text => {
      console.log('text', text);
      
          
          
   
      agent.add(text.text.text.join(''));
      
    }
      
    );   
   
    /*  for(let m = 0; m < payloadImage.link.length; m++) {
       agent.add(payloadImage.link[m].name);
        agent.add(new Image(payloadImage.link[m].url));
      
    }*/
    
     for(let l = 0; l < payloadImage.images.length; l++) {
       agent.add(payloadImage.images[l].name);
        agent.add(new Image(payloadImage.images[l].url,
            ));
    
    }

   
    
  /*   if(images/*&&!imageInText) {
     for(let k = 0; k < 2; k++){
       
         agent.add(new Image(images[k].image.imageUri));
       }}*/
   /*  if(image/*&&!imageInText) {
      IMG_MENU.forEach(img=>
          { agent.add(new Image(img.url));});
    }*/
        for(let i = 0; i < payload.menuOptions.length; i++) {
     
      relatedTopics += `${i + 1}. ${payload.menuOptions[i].name}\n`;
      agent.setContext({ 
        name: `${i + 1}`, 
        lifespan: 1, //why is it 2?
        parameters: { 
          eventName: payload.menuOptions[i].event 
        }
      });
    }
     

    
    agent.add(relatedTopics);
    
     for(let i = 0; i < payload.menuOptions.length; i++) {
     	agent.add(new Suggestion(`${i + 1}`));
     }
      }
  

function fallback(agent){
    //agent.add(new LinkOutSuggestion({"name": "Website", "url": "https://assistant.google.com"}));
  agent.add(`안녕! 내 이름은 Sara. HPV, 관련 질병 및 귀하를 보호하기 위해 할 수있는 것에 관해 궁금한 점이 있으면 도와 드리겠습니다. 그래서, 어떻게 도울 수 있니?`);
agent.add(`가다실 ® 9 주요 안전성 정보에 대한 자세한 내용은 여기: http://dev.ogilvyone.com.sg/marcusk/MSD/SSI/index.html`);

}


 if(action === 'what.is.hpv'){
      
        // Check if the user is in our DB
		const message =chatbase .setApiKey(apikey)  // Your api key
  .setUserId('some-unique-user-id') // The id of the user you are interacting with
  .setPlatform('facebook') // The platform the bot is interacting on/over
  .setVersion('1.0') // The version of the bot deployed
  .setIntent('what-is-hpv'); // the intent of the user message
  //sendResponse("message");
 // response.send("are endi bye    ################");
// agent.add("are endi bye    ################");
  // return sendResponse('hPv anedi rogam ');
			
    }
 /*    if(action === 'what.is.hpv'){
      
        // Check if the user is in our DB
		
   return sendResponse('hPv anedi rogam ra ');
			
    } */


    if(action === 'firebase.find'){
        let userId = 'naren.macklin';
        // Check if the user is in our DB
		
       let userFire= admin.firestore().collection('users').where('userId', '==', userId).limit(1);
		return userFire.get()
            .then(snapshot => {
                let user = snapshot.docs[0]
                if (!user) {
                    // Add the user to DB
                    return sendResponse('User not already exists');
                } else {
                    // User in DB
                    return sendResponse('User already exists');
                }
				
		});}
    if(action === 'firebase.update'){
        let userId = 'naren.macklin';
        // Check if the user is in our DB
		
       let userFire= admin.firestore().collection('users').where('userId', '==', userId).limit(1);
		return userFire.get()
            .then(snapshot => {
                let user = snapshot.docs[0]
                if (!user) {
                    // Add the user to DB
                  return  admin.firestore().collection('users').add({
                        userId: userId
                    }).then(ref => {
                     return   sendResponse('Added new user');
                    });
                } else {
                    // User in DB
                    return sendResponse('User already exists');
                }
				
		});
			
    }

    // Function to send correctly formatted responses to Dialogflow which are then sent to the user
    function sendResponse (responseToUser) {
        // if the response is a string send it as a response to the user
        if (typeof responseToUser === 'string') {
            let responseJson = {};
            responseJson.speech = responseToUser; // spoken response
            responseJson.displayText = responseToUser; // displayed response
            response.json(responseJson); // Send response to Dialogflow
        } else {
            // If the response to the user includes rich responses or contexts send them to Dialogflow
            let responseJson = {};

            // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
            responseJson.speech = responseToUser.speech || responseToUser.displayText;
            responseJson.displayText = responseToUser.displayText || responseToUser.speech;

            // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
            responseJson.data = responseToUser.richResponses;

            // Optional: add contexts (https://dialogflow.com/docs/contexts)
            responseJson.contextOut = responseToUser.outputContexts;

            response.json(responseJson); // Send response to Dialogflow
        }
    }
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
  
    // What is HPV?
    intentMap.set('what.is.hpv', menuHandler);
     intentMap.set('how.can.i.prevent.hpv', menuHandler);
    
  
    
    agent.handleRequest(intentMap);
}

