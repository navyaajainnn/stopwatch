/* eslint-disable no-unused-vars */
import { useState,useEffect,useRef } from "react";


function Stopwatch(){

    const[isRunning, setIsRunning]=useState(false);
    const[elapsed, setElapsed]=useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef=useRef(0);

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current=setInterval(() => {
                setElapsed(Date.now()- startTimeRef.current)
            }, 10);
        }

        return ()=>{
            clearInterval(intervalIdRef.current);
        }

    },[isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current=Date.now()-elapsed;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsed(0);
        setIsRunning(false);
    }

    function formatTime(){
        let h=Math.floor(elapsed/ (1000*60*60) );
        let m=Math.floor(elapsed/ (1000*60) % 60);
        let s=Math.floor(elapsed/(1000) % 60);
        let mm=Math.floor((elapsed % 1000)/10);
        return `${m}:${s}:${mm}`
    }

    return(
        <>
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">START</button>
                <button onClick={stop} className="stop-button">STOP</button>
                <button onClick={reset} className="reset-button">RESET</button>
            </div>
        </div>
        </>
    );
}

export default Stopwatch;