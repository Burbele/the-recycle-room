import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import PropTypes from "prop-types";
import { ref, push, set } from "firebase/database"; // Import 'set' function
import { db } from "./../../firebase-config";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const QuestionForm = forwardRef(({ onSubmit }, parentRef) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    question: "",
  });

  useEffect(() => {
    if (open) {
      // Reset form data when the dialog opens
      setFormData({
        username: "",
        question: "",
      });
    }
  }, [open]);

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.question) {
        alert("Please fill in the required field (Question)");
        return;
      }

      const questionsRef = ref(db, "questions");
      const newQuestionRef = push(questionsRef);

      // Use the 'set' function to set data in the newQuestionRef
      await set(newQuestionRef, {
        username: formData.username || "Anonymous",
        question: formData.question,
      });

      alert("Question submitted successfully!");
      onSubmit && onSubmit(formData);
      closePopup();
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Error submitting question. Check the console for details.");
    }
  };

  // Exposing the openPopup function through the ref
  useImperativeHandle(parentRef, () => ({
    openPopup,
  }));

  return (
    <>
      <Dialog
        open={open}
        onClose={closePopup}
        fullWidth>
        <DialogTitle>
          Need more information?
          <IconButton
            onClick={closePopup}
            style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask a question to our specialist, and we will answer you within 48 hours!
          </DialogContentText>
          <Stack
            spacing={2}
            marginTop={2}>
            <TextField
              variant="outlined"
              label="Your name (optional)"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Your question"
              name="question"
              multiline
              rows={4}
              value={formData.question}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "rgba(92, 146, 114, 1)" }}
              onClick={handleSubmit}
              disabled={!formData.question}>
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
});

// Assigning a display name to the component
QuestionForm.displayName = "QuestionForm";

// PropTypes for prop validation
QuestionForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default QuestionForm;
