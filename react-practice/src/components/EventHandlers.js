export default function EventHandlers() {

    function displayMessage(num, e) {
        alert(num)
        console.log("e", e.target)
    }
    return (
        <>
            <button onClick={(e) => displayMessage(10, e)}>Click</button>
        </>
    )
}