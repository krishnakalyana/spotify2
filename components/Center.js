import { ChevronDownIcon } from '@heroicons/react/outline';
import {useSession} from 'next-auth/react';
import { shuffle } from 'lodash';
import {useState,useEffect} from 'react'
const colours =[
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]
function Center (){
    const {data:session} = useSession()
    const [colour,setColour] = useState(null)
    useEffect(()=>{
        setColour(shuffle(colours).pop())
    },[])
    console.log(session?.user.image);
    return (
        <div className="flex-grow text-white">
            <header className="absolute top-5 right-8">
                <div className="flex items-center space-x-2 bg-black opacity-80 hover:opacity-90  cursor-pointer rounded-full p-1 pr-2">
                    <img className="rounded-full h-10 w-10" src={'/public/favicon.ico'} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black 
            ${colour} h-80 text-white padding-8`}>
                HEllo
            </section>
        </div>

    )
}
export default Center