import { ChevronDownIcon,UserIcon } from '@heroicons/react/outline';
import {useSession,signOut} from 'next-auth/react';
import { shuffle } from 'lodash';
import {useState,useEffect} from 'react' 
import {playlistIdState,playlistState} from '../atoms/playlistAtom'
import  {useRecoilState}  from 'recoil';
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'
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
    const spotifyApi = useSpotify()
    const [colour,setColour] = useState(null)
    const [playlistId,setPlaylistId] = useRecoilState(playlistIdState)
    const [playlist,setPlaylist] = useRecoilState(playlistState)
    useEffect(()=>{
        setColour(shuffle(colours).pop())
    },[playlistId])
    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data)=>{
            console.log("data",data);
            setPlaylist(data.body)
        }).catch((e)=>{
            console.log("something went wrong",e);
        })
    },[spotifyApi,playlistId])
    return (
        <div className="flex-grow  h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center space-x-2 bg-black opacity-80 hover:opacity-90  
                cursor-pointer rounded-full p-1 pr-2 text-white"
                onClick={signOut}
                >
                    {/* <img className="rounded-full h-10 w-10" src={'/public/favicon.ico'} alt="" /> */}
                    <UserIcon className="rounded-full h-6 w-6"/>
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black 
            ${colour} h-80 text-white p-8`}>
               <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="Album art" />
           <div>
               <p>PLAYLIST</p>
               <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
           </div>
            </section>
            <div>
                <Songs/>
            </div>
        </div>

    )
}
export default Center