export default function StartingPage ({startGame}) {
    return (
        <>
            <h1>Quizzical</h1>
            <p>Test your knowledge with hundreas of quiz questions.</p>
            <button className="start-button" onClick={startGame} >Start quiz</button>
        </>
    )
}