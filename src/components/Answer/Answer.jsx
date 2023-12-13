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

const Answer = ({ isOpen, onClose, questionId }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerSubmit = async () => {
    try {
      const db = getDatabase();
      const questionRef = ref(db, `questions/${questionId}`);

      await update(questionRef, {
        answer: answer,
        answerDisplay: "Answered",
      });

      // You may add further logic or state updates after a successful submission

      onClose(); // Close the dialog
      window.location.reload(); // Force refresh the page
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

Answer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  questionId: PropTypes.string,
};

export default Answer;
