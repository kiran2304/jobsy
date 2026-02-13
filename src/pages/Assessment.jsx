import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
    {
        id: 1,
        question: 'What does HTML stand for?',
        options: [
            'Hyper Text Markup Language',
            'Home Tool Markup Language',
            'Hyperlinks and Text Markup Language',
            'Hyper Text Making Language'
        ],
        answer: 0
    },
    {
        id: 2,
        question: 'Which CSS property is used to change the background color?',
        options: [
            'color',
            'bgcolor',
            'background-color',
            'background'
        ],
        answer: 2
    },
    {
        id: 3,
        question: 'Inside which HTML element do we put the JavaScript?',
        options: [
            '<js>',
            '<scripting>',
            '<script>',
            '<javascript>'
        ],
        answer: 2
    },
    {
        id: 4,
        question: 'How do you create a function in JavaScript?',
        options: [
            'function:myFunction()',
            'function = myFunction()',
            'function myFunction()',
            'def myFunction()'
        ],
        answer: 2
    },
    {
        id: 5,
        question: 'In React, what is used to pass data to a component from outside?',
        options: [
            'setState',
            'render',
            'props',
            'PropTypes'
        ],
        answer: 2
    }
];

const Assessment = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleOptionClick = (index) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === QUESTIONS[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < QUESTIONS.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    return (
        <div className="container" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '600px', width: '100%', padding: '2rem' }}>
                {showScore ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quiz Results</h2>
                        <div style={{
                            fontSize: '4rem', fontWeight: 'bold', color: score > 3 ? 'var(--success)' : 'var(--error)',
                            marginBottom: '1rem'
                        }}>
                            {score} / {QUESTIONS.length}
                        </div>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                            {score > 3 ? 'Great job! You passed the assessment.' : 'Keep practicing and try again!'}
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={resetQuiz} className="btn btn-outline">
                                <RefreshCcw size={18} /> Retry Quiz
                            </button>
                            <Link to="/roadmap" className="btn btn-primary">
                                Back to Roadmap
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0 }}>Skill Assessment</h2>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                                Question {currentQuestion + 1}/{QUESTIONS.length}
                            </span>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                                {QUESTIONS[currentQuestion].question}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {QUESTIONS[currentQuestion].options.map((option, index) => {
                                    let style = {
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--border)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        transition: 'all 0.2s'
                                    };

                                    if (isAnswered) {
                                        if (index === QUESTIONS[currentQuestion].answer) {
                                            style.background = '#dcfce7';
                                            style.borderColor = 'var(--success)';
                                            style.color = 'var(--success)';
                                        } else if (index === selectedOption) {
                                            style.background = '#fee2e2';
                                            style.borderColor = 'var(--error)';
                                            style.color = 'var(--error)';
                                        } else {
                                            style.opacity = 0.5;
                                        }
                                    } else {
                                        style.background = 'white';
                                        style.hover = { background: '#f8fafc' }; // Inline hover handling is tricky in JS style objects, usually handled by CSS classes
                                    }

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => handleOptionClick(index)}
                                            style={style}
                                        >
                                            <div style={{
                                                width: '20px', height: '20px', borderRadius: '50%',
                                                border: '2px solid currentColor',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {isAnswered && index === QUESTIONS[currentQuestion].answer && <div style={{ width: '10px', height: '10px', background: 'currentColor', borderRadius: '50%' }} />}
                                                {isAnswered && index === selectedOption && index !== QUESTIONS[currentQuestion].answer && <div style={{ width: '10px', height: '10px', background: 'currentColor', borderRadius: '50%' }} />}
                                            </div>
                                            {option}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleNextQuestion}
                                disabled={!isAnswered}
                                className="btn btn-primary"
                                style={{ opacity: isAnswered ? 1 : 0.5 }}
                            >
                                {currentQuestion === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Assessment;
