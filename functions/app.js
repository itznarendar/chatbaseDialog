const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()
const functions = require('firebase-functions');
const chatbase=require('@google/chatbase');
//const builder = require('botbuilder');
//const random = require('lodash.random');
//const constants = require('../constants/gorge-of-eternal-peril.js');
const apikey="53c96255-9778-49a4-8993-7550935b3526";

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
app.get('/', (req, res) => res.send('online'))
app.post('/dialogflow', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome () {
    agent.add('Welcome to my agent TTTTTTTTTTTTTTTTT!')
  }

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
      
          let intentMap = new Map();
          intentMap.set('Default Welcome Intent', welcome);
          intentMap.set('Default Fallback Intent', fallback);
        
          // What is HPV?
          intentMap.set('what.is.hpv', menuHandler);
           intentMap.set('how.can.i.prevent.hpv', menuHandler);
})

module.exports = app