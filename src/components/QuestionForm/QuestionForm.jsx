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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    question: "",
    image: null,
  });

  useEffect(() => {
    if (open) {
      // Reset form data when the dialog opens
      setFormData({
        username: "",
        question: "",
        image: null,
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
    const { name, value, files } = e.target;

    if (name === "image") {
      // Handle image file
      const imageFile = files[0];
      setFormData((prevData) => ({
        ...prevData,
        image: imageFile,
      }));
    } else {
      // Handle other input fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData.question) {
        alert("Please fill in the required field (Question)");
        return;
      }

      const questionsRef = ref(db, "questions");
      const newQuestionRef = push(questionsRef);

      // Upload image to Firebase Storage if an image is selected
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImage(formData.image);
      }

      // Use the 'set' function to set data in the newQuestionRef
      await set(newQuestionRef, {
        username: formData.username || "Anonymous",
        question: formData.question,
        image: imageUrl, // Store the image URL
      });

      onSubmit && onSubmit(formData);
      toast.success("Question sent!");

      closePopup();
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Error submitting question. Check the console for details.");
    }
  };

  const uploadImage = async (imageFile) => {
    try {
      //url to new image - make sure to have the correct firebase project id
      const url = `https://firebasestorage.googleapis.com/v0/b/recycle-item-app.appspot.com/o/Questions%2F${imageFile.name}`;

      // POST request to upload image
      const response = await fetch(url, {
        method: "POST",
        body: imageFile,
        headers: { "Content-Type": imageFile.type },
      });

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
        return null; // Return null or handle the error as needed
      }
    } catch (error) {
      console.error("An error occurred during image upload:", error);
      return null; // Return null or handle the error as needed
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
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
