// QuestionCard.jsx
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./../../firebase-config";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa6";

import "./QuestionCard.css";

function QuestionCard({ searchValue }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsRef = ref(db, "questions");

    onValue(questionsRef, (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        const questionsArray = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setQuestions(questionsArray);
      } else {
        console.log("No questions found");
      }
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // If searchValue is empty, display all questions
  const displayedQuestions = searchValue
    ? questions.filter((question) =>
        question.question.toLowerCase().includes(searchValue.toLowerCase())
      )
    : questions;

  return (
    <div>
      {displayedQuestions.length === 0 ? (
        <p className="not-found">No matching questions found.</p>
      ) : (
        displayedQuestions.map((question) => (
          <div
            key={question.id}
            className="question-container">
            <article className="display-container">
              <div className="title-container">
                <p className="question-author">{question.username} asked a question</p>
                <p className="question-title">{question.question}</p>
                <p className="question-answer">{question.answerDisplay}</p>
              </div>
              <FaArrowRight className="arrow-right" />
            </article>
          </div>
        ))
      )}
    </div>
  );
}

QuestionCard.propTypes = {
  searchValue: PropTypes.string, // Add this line for searchValue prop
};

export default QuestionCard;
