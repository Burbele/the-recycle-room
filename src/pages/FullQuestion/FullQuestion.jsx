// FullQuestion.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./FullQuestion.css";
import { FaArrowLeft } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";

function FullQuestion() {
  const navigate = useNavigate();

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // This will navigate one page back
  };

  // Get the question ID from the URL params
  const params = useParams();

  // State for storing question data
  const [question, setQuestion] = useState({
    image: "",
    question: "",
    username: "",
    answerDisplay: "",
    answer: "",
  });

  useEffect(() => {
    // Check if params.questionsId is a valid value
    if (!params.questionsId || params.questionsId === "undefined") {
      console.error("Question ID from URL is invalid");
      return;
    }

    // Fetch question data from Firebase
    async function getQuestion() {
      try {
        const url = `https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app/questions/${params.questionsId}.json`;

        const response = await fetch(url);

        if (!response.ok) {
          // Handle non-successful response, e.g., show an error message
          console.error(`Error fetching question: ${response.status}`);
          return;
        }

        const questionData = await response.json();

        // Check if questionData is defined and not empty
        if (questionData) {
          setQuestion({
            image: questionData.image || "", // If "image" is undefined, set it to an empty string
            question: questionData.question || "",
            username: questionData.username || "",
            answerDisplay: questionData.answerDisplay || "",
            answer: questionData.answer || "",
          });

          console.log("Fetched questionData:", questionData);
        } else {
          // Handle case where question data is not available
          console.error("Question data not found");
          // You may want to set a state to indicate that the data is not available
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error fetching question:", error);
      }
    }

    // Trigger the effect only when the URL changes (when params.questionsId changes)
    getQuestion();
  }, [params.questionsId]);

  return (
    <div className="page">
      <Header />
      <div
        className="header-display"
        onClick={goBack}>
        <FaArrowLeft className="arrow-back" />
        <p>return to questions</p>
      </div>

      <div className="question-wrapper">
        <div>
          {question.image && ( // Check if question.image is not an empty string
            <img
              className="question-image-style"
              src={question.image}
              alt="Question Image"
            />
          )}
          <div className="question-answer-padding">
            <p className="username-display">{question.username} is asking</p>
            <h2>{question.question}</h2>
            <p className="answer-status-display">{question.answerDisplay}</p>
          </div>
          <div className="moderator-answer-block">
            <div className="answer-box">
              <div className="moderator-key">
                <p className="moderator-heading">Moderator reply</p>
                <IoKeyOutline />
              </div>
              <p className="italic-answer">{question.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullQuestion;
