import { db } from '../../lib/firebase-admin'
export default async function handler(req, res) {
    try {
        
        const quran = JSON.parse(req.body)
        await quran?.map((qur) => db.collection('en').doc(`chapter${qur?.chapter}`).update({ar: qur?.ar}))
        
        res.status(201).send('Succesfully added quran')
    }
    catch(err) {
        res.status(400).send(err?.message)
    }

}
