import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify"
import { useCallback, useEffect, useState } from 'react'
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    VolumeUpIcon,
    SwitchHorizontalIcon,
    RewindIcon
} from "@heroicons/react/solid";
import { debounce } from "lodash";
function Player() {
    console.log("called");
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50);
    const songInfo = useSongInfo();

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                setIsPlaying(false)
            } else {
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("Now Playing : ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id)
            })
            spotifyApi.getMyCurrentPlaybackState().then(data => {
                setIsPlaying(data.body?.is_playing)
            })
        }
    }
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])
    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])
    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err)=>{})
        }, 500),
        []
    );
    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
        grid grid-cols-3 text-xs md:text-base px-2 md:px-8
        ">
            {/* LEFT */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={songInfo?.album.images?.[0].url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon
                    // onClick={()=>spotifyApi.skipToPrevious()} The API is not working
                    className="button" />
                {isPlaying ?
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                    :
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                }
                <FastForwardIcon
                    // onClick={()=>spotifyApi.skipToNext()} The API is not working
                    className="button" />
                <ReplyIcon className="button" />
            </div>
            {/* Right */}
            <div className="flex items-center justify-end space-x-5 md:space-x-4 pr-5">
                <VolumeDownIcon
                    onClick={() => volume > 0 && setVolume(volume - 10)}
                    className="button" />
                <input
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-14 md:w-28"
                    type="range" value={volume} min={0} max={100} />
                <VolumeUpIcon
                    onClick={() => volume < 100 && setVolume(volume + 10)}
                    className="button" />
            </div>
        </div>
    )
}
export default Player