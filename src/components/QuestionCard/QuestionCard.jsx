import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./../../firebase-config";
import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa6";

import "./QuestionCard.css";

function QuestionCard({ searchValue, visibleQuestions, keyProp }) {
  // State to store the list of questions
  const [questions, setQuestions] = useState([]);
  // State to indicate if the data is still loading
  const [loading, setLoading] = useState(true);
  // Navigate function from react-router-dom for page navigation
  const navigate = useNavigate();

  // Function to open a question when clicked
  function openQuestion(questionId) {
    navigate(`/questions/${questionId}`);
  }

  // useEffect to fetch questions from the database
  useEffect(() => {
    // Reference to the "questions" node in the database
    const questionsRef = ref(db, "questions");

    // Attach an event listener to get data when it changes
    onValue(questionsRef, (snapshot) => {
      setLoading(false); // Data loading is complete
      if (snapshot.exists()) {
        // Convert data to an array of questions with IDs
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

  // If loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If searchValue is empty, display all questions; otherwise, filter by searchValue
  const displayedQuestions = searchValue
    ? questions.filter((question) =>
        question.question.toLowerCase().includes(searchValue.toLowerCase())
      )
    : questions;

  return (
    <div key={keyProp}>
      {displayedQuestions.length === 0 ? (
        // Display message when no matching questions are found
        <p className="not-found">No matching questions found.</p>
      ) : (
        // Display the list of questions
        displayedQuestions.map((question) => (
          <div
            key={question.id}
            className="question-container">
            {/* Display individual question */}
            <article
              className="display-container"
              onClick={() => openQuestion(question.id)}>
              <div className="title-container">
                <p className="question-author">{question.username} asked a question</p>
                {/* Truncate long questions for display */}
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

// PropTypes for prop validation
QuestionCard.propTypes = {
  searchValue: PropTypes.string,
  visibleQuestions: PropTypes.number,
  keyProp: PropTypes.number,
};

export default QuestionCard;
