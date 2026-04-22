import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";
export const PlayerContext = createContext();
const PlayerContextProvider = (props) =>{
    const audioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();
    const [track, setTrack] = useState(songsData[1]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime:{
            second: 0,
            minute:0
        },
        totalTime:{
            second: 0,
            minute:0
        }
    })
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }
    const playWithId = async(id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
    const previous = () => {
    if (track.id > 0) {
        setTrack(songsData[track.id - 1]);
    }
}

const next = () => {
    if (track.id < songsData.length - 1) {
        setTrack(songsData[track.id + 1]);
    }
}

const seekSong = (e) => {
    if (!audioRef.current.duration) return;

    const percent =
      e.nativeEvent.offsetX / seekbg.current.offsetWidth;

    audioRef.current.currentTime =
      percent * audioRef.current.duration;
}

useEffect(() => {
    if (audioRef.current) {
        audioRef.current.load();

        if (playStatus) {
            audioRef.current.play();
        }
    }
}, [track]);
    useEffect(() => {
        setTimeout(()=> {
            audioRef.current.ontimeupdate = () => {
                seekbar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%" 
                setTime({
        currentTime:{
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime:{
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60)
        }
        })
            }
        }, 1000)

    },[audioRef])
    const contextValue = {
        audioRef,
        seekbg,
        seekbar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous, next,
        seekSong
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider;