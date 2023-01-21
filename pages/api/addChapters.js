import { db } from '../../lib/firebase-admin'
export default async function handler(req, res) {
    try {
        
        const chapters = JSON.parse(req.body)
        await chapters?.map((chapter) => db.collection('chapters').doc(`chapter ${chapter?.id}`).set(chapter))
        // await db.collection("chapters").doc(`chapter${chapters?.id}`).set(chapters)
        
        res.status(201).send('lol')
    }
    catch(err) {
        res.status(400).send(err?.message)
    }

}
