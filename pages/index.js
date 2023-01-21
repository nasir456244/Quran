import Link from "next/link";
import { useRouter } from "next/router";
import ar from "../data/ar";
import chapters from "../data/chapters";
export default function Home({data}) {

  // const handleAddChapters = async () => {
  //   const response = await fetch('http://localhost:3000/api/addChapters', {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(chapters)
  //   })
  //   const res = await response.json();
  //   alert(res)
  // }

//   const handleSubmitQuran = async () => {

//     const quran = Object?.values(ar)?.map((i) =>{
//         const w = i?.map((y) => y?.chapter)
//         const ar = i?.map((lo) => lo?.text)
//         const wow = i?.filter(({chapter}, index) => !w?.includes(chapter, index + 1))?.map((h) => h.chapter )
//         return {chapter:wow[0], ar}
//     })
//     // console.log(quran?.slice(10,114))
//     const response = await fetch('http://localhost:3000/api/addQuran', {
//         method: 'POST',
//         header: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(quran?.slice(10,114))
//     })
//     const res = await response.json();
//     alert(res)
// }

  return (
      <div className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:w-[80%] mx-auto gap-4">

          {data?.map((quran) => (
            <Link href={{pathname: `/chapter/${quran?.id}`, query: quran}}
              as={`/chapter/${quran?.id}`}
            className="parent bg-black hover:border-cyan-400 cursor-pointer h-fit 
            flex items-center px-4 py-7 border-2 gap-5 rounded-[10px]
            transition delay-150 duration-300 ease-in-out" key={quran?.name}>
              <div 
              className="number w-[60px] bg-gray-400 transition delay-150 duration-300 ease-in-out 
              h-[60px] flex items-center justify-center rotate-45 rounded-[3px]">
                <p className="-rotate-45 text-black">{quran?.id}</p>
              </div>
              <div className="flex-1">
                <p className="name text-white transition delay-150 duration-300 ease-in-out"> {quran?.transliteration} </p>
                <p className="text-white">{quran?.translation}</p>
              </div>
              <div>
                <p className="text-white"> {quran?.name} </p>
                <p className="ayahs text-white transition delay-150 duration-300 ease-in-out">{quran?.total_verses} Ayahs</p>
              </div>
            </Link>
          ))}
      </div>


    </div> 
  )
}



export const getStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/quran'); 
  const data = await response?.json()

  return {
    props: {
      data
    }
  }
}