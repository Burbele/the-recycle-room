import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./../../firebase-config";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa6";

import "./QuestionCard.css";

function QuestionCard({ searchValue, visibleQuestions, keyProp }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function openQuestion(questionId) {
    navigate(`/questions/${questionId}`);
  }

  useEffect(() => {
    const questionsRef = ref(db, "questions");

    onValue(questionsRef, (snapshot) => {
      setLoading(false);
      if (snapshot.exists()) {
        const questionsArray = Object.entries(snapshot.val()).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        // Limit the number of questions based on visibleQuestions
        const limitedQuestions = questionsArray.slice(0, visibleQuestions);
        setQuestions(limitedQuestions);
      } else {
        console.log("No questions found");
      }
    });
  }, [visibleQuestions]); // Trigger useEffect when visibleQuestions changes

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
    <div key={keyProp}>
      {displayedQuestions.length === 0 ? (
        <p className="not-found">No matching questions found.</p>
      ) : (
        displayedQuestions.map((question) => (
          <div
            key={question.id}
            className="question-container">
            <article
              className="display-container"
              onClick={() => openQuestion(question.id)}>
              <div className="title-container">
                <p className="question-author">{question.username} asked a question</p>
                <p className="question-title">
                  {question.question.length > 95
                    ? question.question.slice(0, 95).replace(/^(.{1,95})\s.*$/, "$1") + "..."
                    : question.question.charAt(0).toUpperCase() + question.question.slice(1)}
                </p>
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
  searchValue: PropTypes.string,
  visibleQuestions: PropTypes.number,
  keyProp: PropTypes.number,
};

export default QuestionCard;
