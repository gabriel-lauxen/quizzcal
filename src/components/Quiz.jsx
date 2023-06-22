import React, { useEffect, useState } from 'react';

export default function Quiz () {
    
    const [questions,setQuestions] = useState([])

    const getQuestions = () => {
        fetch('https://opentdb.com/api.php?amount=5').then(r => {
            return r.json()
        }).then(data => {
            setQuestions(data)
        })
        
    }
    useEffect(() => {
        getQuestions()
        console.log(questions)
    },[])

    return (
        <>
            <h1>quiz!</h1>
        </>
    )
}