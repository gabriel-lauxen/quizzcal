import React, { useEffect, useState } from 'react';
import {decode} from 'html-entities';
import { shuffle } from "lodash";

export default function Quiz () {
    
    const [questions,setQuestions] = useState([])

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(r => {return r.json()})
        .then(data => {
            const formattedQuestions = data.results.map(question => {
                const answers = shuffle([...question.incorrect_answers,question.correct_answer])
                return {...question,answers,selectedOption: ''}
            })
            setQuestions(formattedQuestions)
        }) 
    },[])
    
    console.log(questions)

    const questionsElements = questions.map(question => {
        return (
            <div className='question'>
                <h3 className='question-title' >{decode(question.question,'all')}</h3>
                <div className='answers-container'>
                    {question.answers.map(answer => {
                        return <div className='question-answer'>{decode(answer,'all')}</div>
                    })}
                </div>

            </div>

        )
    })

    return (
        <>   
            <div className='questions-container'>
                {questionsElements}
            </div>
        </>
    )
}