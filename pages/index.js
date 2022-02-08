import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
        {/* Center */}
      </main>
      <div>
        {/* Player */}
      </div>
    </div>
  )
}

export async function getServerSideprops(context){
  const session = await getSession(context)
  return{
    props:{
      session,
    },
  };
}