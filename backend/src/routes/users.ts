// src/routes/user.ts
import { Router } from 'express';
import verifyToken from '../middleware/auth';
import checkUserExists from '../helper/auth/checkUser';

const router = Router();

router.get('/profile', verifyToken, (req, res) => {
  // Fetch user profile from Firebase database
});

router.post("/:email", async (req,res)=>{
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

router.put('/profile', verifyToken, (req, res) => {
  // Update user profile
});

router.get('/preferences', verifyToken, (req, res) => {
  // Fetch user preferences
});

router.put('/preferences', verifyToken, (req, res) => {
  // Update user preferences
});

router.put('/account', verifyToken, (req, res) => {
  // Change email or password
});

export default router;