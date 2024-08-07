import { admin, db } from "../../config/firebaseAdmin";

async function setUserInterests(uid:string | undefined | string[], data:string[]){
    try {
      await db.ref('users/'+uid+'/interests').set(data);
    } catch (error) {
      console.error(error);
    }
    return;
}

async function getUserInterests(uid:string | undefined | string[]){
  try {
    const snapshot = await db.ref('users/'+uid+'/interests').get();
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

async function setUserSummaryStyle(uid:string | undefined | string[], data:string){
    try {
      await db.ref('users/'+uid+'/summary-style').set(data);
    } catch (error) {
      console.error(error);
    }
    return;
}

async function getUserSummaryStyle(uid:string | undefined | string){
  try {
    const snapshot = await db.ref('users/'+uid+'/summary-style').get();
    const data = snapshot.val();
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}

export {setUserInterests, getUserInterests, getUserSummaryStyle, setUserSummaryStyle};