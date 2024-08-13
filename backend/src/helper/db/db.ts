import { admin, db } from "../../config/firebaseAdmin";
import { interestsIdentification } from "../geminiapi/gemini";

async function setUserInterests(uid:string, data:string){
  try {
    console.log("Trying to insert data in database");
    
    const aiData = await interestsIdentification(data);

    const info = {
      interests: aiData.interests,
      countryCode : aiData.country
    }

    console.log(`Writing data to Firebase:\nPath: users/${uid}/info\nData:`, info);
    
    await db.ref('users/'+uid+'/info').set(info);

    console.log('Data successfully written to Firebase');

  } catch (error) {
    console.error('Error in setUserInterests:', error);
  }
  return;
}

async function getUserInterests(uid:string){
  try {
    const snapshot = await db.ref('users/'+uid+'/info').get();
    const data = await snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function setUserSummaryStyle(uid:string, data:string){
    try {
      await db.ref('users/'+uid+'/summary-style').set(data);
    } catch (error) {
      console.error(error);
    }
    return;
}

async function getUserSummaryStyle(uid:string){
  try {
    const snapshot = await db.ref('users/'+uid+'/summary-style').get();
    const data = await snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export {setUserInterests, getUserInterests, getUserSummaryStyle, setUserSummaryStyle};