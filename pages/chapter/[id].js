import { useRouter } from 'next/router'
import React from 'react'
import ar from "../../data/ar"
import { db } from '../../lib/firebase-admin'

const Chapter = ({data}) => {
    const router = useRouter()
    const { name } = router.query;

    // const handleSubmitQuran = async () => {

    //     const quran = Object?.values(ar)?.map((i) =>{
    //         const w = i?.map((y) => y?.chapter)
    //         const ar = i?.map((lo) => lo?.text)
    //         const wow = i?.filter(({chapter}, index) => !w?.includes(chapter, index + 1))?.map((h) => h.chapter )
    //         return {chapter:wow[0], ar}
    //     })

    //     console.log(quran)
    //     const response = await fetch('http://localhost:3000/api/addQuran', {
    //         method: 'POST',
    //         header: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(quran)
    //     })
    //     const res = await response.json();
    //     alert(res)
    // }


  return (
    <div>
        <div className='flex items-center justify-center relative top-14 text-[50px]'>
            <h1 className='text-white'>{name}</h1>
            <span className='text-white '> سورة</span>
        </div>
        <img className='object-contain mx-auto' src='https://www.shutterstock.com/shutterstock/videos/1043712793/thumb/11.jpg?ip=x480' />
        <div className='flex flex-row items-center justify-center'>
            <div className='hidden lg:flex-col h-full w-fit relative left-[8%]'>
                {data?.signs.filter((item, index) => index % 2 === 0).map((item, index) => (
                    <div className='text-white text-2xl h-[210px] my-1' key={index}>{index + 1}</div>
                    ))}
            </div>
            <div className=' mx-auto lg:max-w-[80%] lg:grid grid-cols-2 flex-1'>
                    {data?.signs?.map((verse, index) => (
                        <div key={verse} className=" gap-2 w-full my-2 h-[200px] border-b-2 border-cyan-400 ">
                            <p className='text-white text-2xl flex items-center mb-12'>{verse}</p>
                        </div>
                    ))}
                {/* <div className=' bg-pink-200'>
                    {data?.ar?.map((verse, index) => (
                        <div key={verse} className="h-[400px] lg:h-[200px] my-2 border-b-2 border-cyan-400">
                            <p className='text-white text-2xl'>{verse}</p>
                        </div>
                    ))}
                </div> */}
            </div>
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
    const id = context.params.id;
    const signs = [];

    const data = await db.collection("en").doc(`chapter${id}`).get();
    const surah = data?.data();
    for (let i =0; i < surah?.ayahs?.length; i++) {
        signs?.push(surah?.ayahs[i])
        signs?.push(surah?.ar[i])
    }

    
    return {
        props: {
            data: {chapter: surah?.chapter, signs}
        }
    }
}