import { db } from '../../lib/firebase-admin'
export default async function handler(req, res) {
  try {

    let data = [];
    let sorted = [];
    const snapshot = await db.collection('chapters').get()
    data = snapshot?.docs?.map((doc) => doc?.data())
    sorted = data?.sort((a,b) =>  a?.id - b?.id)
    
    res.json(sorted)
  }
  catch (err) {
    res.staus(400).send(err?.message)
  }

}
