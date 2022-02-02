import { ChevronDownIcon } from '@heroicons/react/outline';
import {useSession} from 'next-auth/react'
function Center (){
    const {data:session} = useSession()
    console.log(session?.user.image);
    return (
        <div className="flex flex-grow text-white">
            <header className="absolute top-5 right-8">
                <div className="flex items-center space-x-2 bg-yellow opacity-80 hover:opacity-90  cursor-pointer rounded-4 p-1 pr-2">
                    <img className="rounded-full h-10 w-10" src={session?.user.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black 
            from-red-500 h-80 text-white padding-8`}>
                HEllo
            </section>
        </div>

    )
}
export default Center