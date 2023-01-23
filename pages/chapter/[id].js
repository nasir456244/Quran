import { useRouter } from 'next/router'
import React from 'react'
import { db } from '../../lib/firebase-admin'

const Chapter = ({data}) => {
    const router = useRouter()
    const { name } = router.query;

  return (
    <div>
        <div className='flex items-center justify-center relative top-14 text-[50px]'>
            <h1 className='text-white'>{name}</h1>
            <span className='text-white '> سورة</span>
        </div>
        <img className='object-contain mx-auto' src='https://www.shutterstock.com/shutterstock/videos/1043712793/thumb/11.jpg?ip=x480' />

        <div className=' mx-auto lg:max-w-[80%] grid lg:grid-cols-2 grid-cols-1'>
                {data?.signs?.map((verse, index) => 

                    <div key={verse} className="gap-20 w-full my-2 h-[200px] flex flex-row items-center border-b-2 border-cyan-200">
                        <span className='text-white text-2xl'>{verse?.verse}</span>
                        <p className='text-white text-2xl h-full flex flex-col justify-end pb-10'>{verse?.text}</p>
                    </div>
                    
                )}


        </div>
    
    </div>
  )
}

export default Chapter


export const getStaticPaths = async () => {
    const data = await db.collection("en").get()

    const paths = data?.docs?.map(doc => {
        return {
            params: { id: doc?.data()?.chapter?.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }

}


export const getStaticProps = async (context) => {
    const id = context?.params?.id;
    const signs = [];
    const document = `chapter${id}`


    const data1 = await db.collection("en").doc(document).get();
    const data2 = await db.collection("ar").doc(document).get();
    for (let i =0; i < (Object?.keys(data1?.data())?.length - 1); i++) {
        signs?.push(data1?.data()[i])
        signs?.push(data2?.data()[i])
    }


    
    return {
        props: {
            data: {chapter: data2?.data()?.chapter, signs}
        }
    }
}