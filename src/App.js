// src/App.js

import React, { useState } from 'react';
import Question from './components/Question';
import questions from './Data/questions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="app-container">
      <TransitionGroup>
        {showScore ? (
          <CSSTransition key="score" timeout={300} classNames="fade">
            <div className="score-section">
              Your score is {score} out of {questions.length}
            </div>
          </CSSTransition>
        ) : (
          <CSSTransition key={currentQuestionIndex} timeout={300} classNames="fade">
            <Question
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default App;
