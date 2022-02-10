import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center'
import Sidebar from '../components/Sidebar'
import Players from '../components/Player'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Players />
      </div>
    </div>
  )
}

// export async function getStaticProps(context) {
//   const session = await getSession(context)

//   return {
//     props: {
//       session,
//     },
//   }
// }
