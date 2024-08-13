// src/routes/user.ts
import { Router } from 'express';
import verifyToken from '../middleware/auth';
import { admin } from '../config/firebaseAdmin';
import checkUserExists from '../helper/auth/checkUser';
import { getUserInterests, setUserInterests, getUserSummaryStyle, setUserSummaryStyle } from '../helper/db/db';
import extractUidFromToken from '../helper/auth/decodeToken';

const router = Router();

async function createUser(email:string, password:string) {

  //Created temporarily for testing purpose only

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password
    });
    console.log('Successfully created new user:', userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function createCustomToken(uid:string) {

  // Created temporarily for testing purpose only

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
}

router.post('/create-user', async (req, res) => {

  // Created temporarily for testing purpose only
  //create temp user for testing purpose

  const userRecord = await createUser('user2@example.com', 'password123');
  const customToken = await createCustomToken(userRecord.uid);
  res.json({user: userRecord, token: customToken});
});


router.post("/checkuser/:email", async (req,res)=>{
  //Check if user exists or not

  const email = req.params.email;

  if(await checkUserExists(email)){
    console.log("User with id exists "+ email);
    return res.send("User exists");
  } else {
    console.log("User does not exist" + email);
    return res.status(404).json({"Error":"404 User not found"})
    
  }
})

router.get('/summary-style', verifyToken, async (req, res) => {

  // Get user interest category details from database
  // Expected request: 
  // {
  //   headers: {Authorization: Bearer token}, 
  // }

  
  const idToken: string = req.headers.authorization!.split(' ')[1];
  const userId: string = await extractUidFromToken(idToken);
  
  try {
    
    // response for testing frontend:
    // const data = "Captain Jack Sparrow from Pirates of the Carribean";

    const data = await getUserSummaryStyle(userId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

router.post('/summary-style', verifyToken, async (req, res) => {

  // Save user interest category details to database
  // Expected request: 
  // {
  //   headers: {Authorization: Bearer token}, 
  //   body: {summaryStyle: "Captain Jack Sparrow from Pirates of the Carribean"}
  // }
  const idToken: string = req.headers.authorization!.split(' ')[1];
  const summaryStyle:string = req.body.summaryStyle;

  const userId: string = await extractUidFromToken(idToken);

  try {
    await setUserSummaryStyle(userId, summaryStyle);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update data' });
  }

});

router.get('/interests', verifyToken, async (req, res) => {

  // Get user interest category details from database
  // Expected request: 
  // {
  //   headers: {Authorization: Bearer token}, 
  // }

  const idToken: string = req.headers.authorization!.split(' ')[1];
  const userId: string = await extractUidFromToken(idToken);

  try {
    const data = await getUserInterests(userId);
    // response for testing frontend:
    /*
    const data = {
      "countryCode": "DE",
      "interests": [
          "sports",
          "soccer",
          "table tennis",
          "stock market",
          "global news",
          "anime",
          "One Piece"
      ]
    }
    */
   
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

router.post('/interests', verifyToken, async (req, res) => {

  // Save user interest category details to database
  // Expected request: 
  // {
  //   headers: {Authorization: Bearer token}, 
  //   body: interests: "I am from XYZ country and like topic 1, topic 2 ... topic N.";
  // }
  const idToken: string = req.headers.authorization!.split(' ')[1];
  const interests:string = req.body.interests;

  const userId: string = await extractUidFromToken(idToken);

  try {
    console.log(`Now setting user info (interests)... \nuserId: ${userId}\ninterests string:${interests}`);
    
    await setUserInterests(userId, interests);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update data' });
  }

});
  

export default router;