import 'dotenv/config'
import express from 'express'
import initApp from './src/app.router.js';
import Stripe from "stripe";

const stripe=new Stripe('sk_test_51PQkLGE32qRADTS19pXPEWuP0KpNfrxU5vSP8ysgy7y7LRgY9U0AiOmjDejRySziESmZnf2pMjwyPD6FuJZvSjnr00qiBUfKdw')
const app=express()
const PORT = process.env.PORT || 3000;

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
   const sig = request.headers['stripe-signature'];
 
   let event;
 
   try {
     event = stripe.webhooks.constructEvent(request.body, sig,  "whsec_38cdace8cb62edd32d95096c24f05dc893826c74fa2a28014a03fc059697f388");
   } catch (err) {
     response.status(400).send(`Webhook Error: ${err.message}`);
     return;
   }

   if(event.type== 'checkout.session.completed'){
      const checkoutSessionCompleted = event.data.object;
   }else{
      console.log(`Unhandled event type ${event.type}`);
   }
 
  
   // Return a 200 response to acknowledge receipt of the event
   response.send();
 });

initApp(app,express)

app.listen(PORT,()=>{
   console.log(`server listening on ${PORT}`) 
})