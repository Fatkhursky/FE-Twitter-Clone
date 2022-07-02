//@ts-nocheck
import React from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
const Tes = () => {
  const [stepNum, setStepNum] = useState(0)
  console.log(stepNum)
  if (stepNum === 1) {
    return (
      <>
        <Head>
          <title>tes</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div>
          <h1>stepnum 1</h1>
          <button onClick={() => setStepNum(2)}>change to step 2</button>
        </div>
      </>
    )
  } else if (stepNum === 2) {
    return (
      <div>
        <h1>step num 2 </h1>
        <button onClick={() => setStepNum(0)}>back to step default</button>
      </div>
    )
  } else {
    return (
      <div>
        <h1> stepnum default</h1>
        <button onClick={() => setStepNum(1)}>change to step 1</button>
      </div>
    )
  }

  //return <div>{Tes()}</div>
}

export default Tes

// if (stepNum === 1) {
//     return <div>
//         <h1>stepnum 1</h1>
//         <button onClick={()=> setStepNum(2)}>change to step 2</button>
//     </div>
//   } else if (stepNum === 2) {
//     return <div>stepnum 2</div>
//   } else {
//     return (
//       <div>
//         <h1> stepnum default</h1>
//         <button onClick={()=> setStepNum(1)}>change to step 1</button>
//       </div>
//     )
//   }

// switch (stepNum) {
//     case stepNum === 1:
//       return (
//         <div>
//           <h1>stepnum 1</h1>
//           <button onClick={() => setStepNum(2)}>change ti step 2</button>
//         </div>
//       )
//       break

//     default:
//       return (
//         <div>
//           <h1>default step</h1>
//           <button onClick={() => setStepNum(1)}>change to step 1</button>
//         </div>
//       )
//       break
//   }

// import Link from 'next/link'

// function Home() {
//   return (
//     <ul>
//       <li>
//         <Link href="/post/abc">
//           <a>Go to pages/post/[pid].js</a>
//         </Link>
//       </li>
//       <li>
//         <Link href="/post/abc?foo=bar">
//           <a>Also goes to pages/post/[pid].js</a>
//         </Link>
//       </li>
//       <li>
//         <Link href="/post/abc/a-comment">
//           <a>Go to pages/post/[pid]/[comment].js</a>
//         </Link>
//       </li>
//     </ul>
//   )
// }

// export default Home
