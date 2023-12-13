import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./FullQuestion.css";
import { FaArrowLeft } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import Login from "../../components/Login/Login";
import Answer from "../../components/Answer/Answer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function FullQuestion() {
  const navigate = useNavigate();

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAnswerOpen, setAnswerOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false); // new state
  const params = useParams();

  const [question, setQuestion] = useState({
    image: "",
    question: "",
    username: "",
    answerDisplay: "",
    answer: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!params.questionsId || params.questionsId === "undefined") {
      console.error("Question ID from URL is invalid");
      return;
    }

    async function getQuestion() {
      try {
        const url = `https://recycle-item-app-default-rtdb.europe-west1.firebasedatabase.app/questions/${params.questionsId}.json`;

        const response = await fetch(url);

        if (!response.ok) {
          console.error(`Error fetching question: ${response.status}`);
          return;
        }

        const questionData = await response.json();

        if (questionData) {
          setQuestion({
            image: questionData.image || "",
            question: questionData.question || "",
            username: questionData.username || "",
            answerDisplay: questionData.answerDisplay || "",
            answer: questionData.answer || "",
          });

          console.log("Fetched questionData:", questionData);
        } else {
          console.error("Question data not found");
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    }

    getQuestion();
  }, [params.questionsId]);

  const handleAnswerOpen = () => {
    setAnswerOpen(true);
  };

  const handleAnswerClose = () => {
    setAnswerOpen(false);
  };

  const handleLogin = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const db = getDatabase();
      const questionRef = ref(db, `questions/${params.questionsId}`);
      await remove(questionRef);
      navigate(-1);
      // Show success toast
      toast.success("Question deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      // Show error toast
      toast.error("Error deleting question", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div className="page">
      <Header />
      <div
        className="header-display"
        onClick={() => navigate(-1)}>
        <FaArrowLeft className="arrow-back" />
        <p>return to questions</p>
      </div>

      <div className="question-wrapper">
        {question.image && (
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
              {!user && <IoKeyOutline onClick={handleLogin} />}
            </div>
            <p className="italic-answer">{question.answer}</p>
          </div>
        </div>
      </div>

      {user && (
        <div className="button-moderator">
          <button
            className="button-answer"
            onClick={handleAnswerOpen}>
            Answer
          </button>
          <button
            className="button-delete"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      {isAnswerOpen && (
        <Answer
          isOpen={isAnswerOpen}
          onClose={handleAnswerClose}
          questionId={params.questionsId}
        />
      )}

      {isLoginOpen && (
        <Login
          onLogin={handleLogin}
          onClose={handleLoginClose}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCancelDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this question?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            style={{ color: "rgba(43, 36, 42, 1)" }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{ color: "rgba(43, 36, 42, 1)" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FullQuestion;
