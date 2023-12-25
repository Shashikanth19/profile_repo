import { useEffect } from "react"

export default function UseEffectExample() {

    /**Syntax for useEffect useEffect(callBackFunction as argumnet, dependency array optional) */
    useEffect(() => {
        console.log("inside useEffect")
    })

    return(
        <>
            <h1>Demo of useEffect {console.log("inside component")}</h1>
        </>
    )
}