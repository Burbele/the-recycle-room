import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { getDatabase, ref, update } from "firebase/database";

// Answer component for providing answers to questions
const Answer = ({ isOpen, onClose, questionId }) => {
  // State to store the answer text
  const [answer, setAnswer] = useState("");

  // Function to handle submitting the answer
  const handleAnswerSubmit = async () => {
    try {
      // Get the database instance
      const db = getDatabase();

      // Reference to the question in the database
      const questionRef = ref(db, `questions/${questionId}`);

      // Update the question with the provided answer
      await update(questionRef, {
        answer: answer,
        answerDisplay: "Answered",
      });

      // Close the dialog
      onClose();

      // Force refresh the page to reflect the updated answer
      window.location.reload();
    } catch (error) {
      console.error("Error updating answer:", error.message);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth>
      <DialogTitle>Answer the question</DialogTitle>

      <DialogContent>
        <Stack
          spacing={2}
          marginTop={2}>
          {/* Input field for entering the answer */}
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Your Answer"
            variant="outlined"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Stack>
        {/* Dialog actions (Submit and Cancel buttons) */}
        <DialogActions>
          <Button
            onClick={handleAnswerSubmit}
            variant="contained"
            style={{ backgroundColor: "rgba(92, 146, 114, 1)" }}>
            Submit
          </Button>
          <Button
            onClick={onClose}
            style={{ color: "rgba(43, 36, 42, 1)" }}>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes for prop validation
Answer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  questionId: PropTypes.string,
};

export default Answer;
