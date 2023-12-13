import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./../../firebase-config";
import PropTypes from "prop-types";

import "./QuestionCard.css";

function QuestionCard({ searchValue }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsRef = ref(db, "questions");

    onValue(questionsRef, (snapshot) => {
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

  // Filter questions based on searchValue
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {filteredQuestions.map((question) => (
        <div
          key={question.id}
          className="question-container">
          <article>
            <p className="question-author">
              {question.username
                ? `${question.username} asked a question`
                : "Anonymous asked a question"}
            </p>
            <p className="question-title">{question.question}</p>
            <p className="question-answer">{question.answer}</p>
          </article>
        </div>
      ))}
    </div>
  );
}

QuestionCard.propTypes = {
  searchValue: PropTypes.string, // Add this line for searchValue prop
};

export default QuestionCard;
