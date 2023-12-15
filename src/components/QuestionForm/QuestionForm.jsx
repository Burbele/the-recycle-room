import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import PropTypes from "prop-types";
import { ref, push, set } from "firebase/database";
import { db } from "./../../firebase-config";
import { toast, ToastContainer } from "react-toastify";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  IconButton,
  Input,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const QuestionForm = forwardRef(({ onSubmit }, parentRef) => {
  // State for managing the visibility of the form popup
  const [open, setOpen] = useState(false);

  // State for storing form data (username, question, image)
  const [formData, setFormData] = useState({
    username: "",
    question: "",
    image: null,
  });

  // Effect to reset form data when the popup is opened
  useEffect(() => {
    if (open) {
      setFormData({
        username: "",
        question: "",
        image: null,
      });
    }
  }, [open]);

  // Function to open the form popup
  const openPopup = () => {
    setOpen(true);
  };

  // Function to close the form popup
  const closePopup = () => {
    setOpen(false);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      // Handle image file selection
      const imageFile = files[0];
      setFormData((prevData) => ({
        ...prevData,
        image: imageFile,
      }));
    } else {
      // Handle text input changes
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      if (!formData.question) {
        // Alert if the question field is empty
        alert("Please fill in the required field (Question)");
        return;
      }

      // Database reference for questions
      const questionsRef = ref(db, "questions");
      const newQuestionRef = push(questionsRef);

      // Upload image (if provided) and get the image URL
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      // Save the question data to the database
      await set(newQuestionRef, {
        username: formData.username || "Anonymous",
        question: formData.question,
        image: imageUrl,
        answerDisplay: "No answer yet",
        answer: "Waiting for reply",
      });

      // Callback function for onSubmit prop
      onSubmit && onSubmit(formData);

      // Show success toast
      toast.success("Question sent!");

      // Close the form popup
      closePopup();
    } catch (error) {
      console.error("Error submitting question:", error);
      // Show an alert if there is an error
      alert("Error submitting question. Check the console for details.");
    }
  };

  // Function to upload an image to Firebase Storage
  const uploadImage = async (imageFile) => {
    try {
      // URL for Firebase Storage
      const url = `https://firebasestorage.googleapis.com/v0/b/recycle-item-app.appspot.com/o/Questions%2F${imageFile.name}`;

      // Upload the image file using the fetch API
      const response = await fetch(url, {
        method: "POST",
        body: imageFile,
        headers: { "Content-Type": imageFile.type },
      });

      // Check if the upload was successful
      if (response.ok) {
        const data = await response.json();
        console.log("Image upload successful:", data);
        const imageUrl = `${url}?alt=media`;
        return imageUrl;
      } else {
        console.error(
          "Image upload failed. Server response:",
          response.status,
          response.statusText
        );
        console.log(url);
        return null;
      }
    } catch (error) {
      console.error("An error occurred during image upload:", error);
      return null;
    }
  };

  // Expose the openPopup function to the parent component
  useImperativeHandle(parentRef, () => ({
    openPopup,
  }));

  return (
    <>
      {/* Form popup dialog */}
      <Dialog
        open={open}
        onClose={closePopup}
        fullWidth>
        <DialogTitle>
          Need more information?
          {/* Close button */}
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
          {/* Form inputs */}
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
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
            {/* Submit button */}
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
      {/* Toast container for displaying success messages */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
      />
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
