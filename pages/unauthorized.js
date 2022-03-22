import {useState, useEffect, useRef} from 'react'

export default function Unauthorized() {
    const [timer, setTimer] = useState(3)
    const uhoh = useRef(null)
    
    useEffect(() => {
        uhoh.current.style.visibility = 'hidden'
    }, [])

    useEffect(() => {
        const clock = setTimeout(() => {
            setTimer(timer - 1)
        }, 1000)

        if(timer < -2) {
            uhoh.current.style.visibility = 'visible'
        }

        return () => clearTimeout(clock)
    })

    return (
        <div style={{'width': '100%', 'height': 'calc(100vh - (3.8rem + clamp(10rem, 30vh, 17rem)))', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'flexDirection': 'column'}}>
            <h1>Unauthorized access. Self-destruct sequence initiated.</h1>
            <h3>Time remaining: {timer} seconds</h3>
            <h4 ref={uhoh}>Whoops. That's not supposed to happen.</h4>
        </div>
    )
}