import React, { useEffect, useState } from 'react';
import {decode} from 'html-entities';
import { shuffle } from "lodash";

export default function Quiz () {
    
    const [questions,setQuestions] = useState([])
    const [checked,setChecked] = useState(false)
    const [correctAnswers,setCorrectAnswers] = useState(0)
    
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
    

    function selectOption(questionIndex,answer) {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions]
            newQuestions[questionIndex].selectedOption = answer
            return newQuestions   
        })
    }

    const questionsElements = questions.map((question,i) => {
        return (
            <div key={question.question} className='question'>
                <h3 className='question-title' >{decode(question.question,'all')}</h3>
                <div className='answers-container'>
                    {question.answers.map(answer => {
                        return <div key={answer}
                                    onClick={() => selectOption(i,answer)}
                                    className={question.selectedOption === answer ?
                                        'answer answer-selected' :
                                        'answer'
                                    }
                                >
                                        {decode(answer,'all')}
                                </div>
                    })}
                </div>

            </div>

        )
    })

    const checkAnswers = () => {
        console.log(questions.length)
        setChecked(true)
        setCorrectAnswers( () => {
            const filtered = questions.filter(question => question.correct_answer === question.selectedOption)
            console.log('corretas', filtered)
            return filtered.length
        })
    }

    return (
        <>   
            <div className='questions-container'>
                {questionsElements}
                <div className="buttons-container">
                    {!checked ?
                
                    <button onClick={() => checkAnswers()}>
                        Check answers
                    </button> :
                    <>
                        <h4>You scored {correctAnswers}/{questions.length} correct answers</h4>
                        <button onClick={() => setChecked(false)}>
                            Play again
                        </button>
                    </>
                    }
                </div>
            </div>
        </>
    )
}