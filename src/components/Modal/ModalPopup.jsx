import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ModalPopup component with forwardRef to expose openPopup function
const ModalPopup = React.forwardRef((props, ref) => {
  // State to manage the dialog open/close and form data
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemName: "",
    notify: false,
  });

  // Function to open the dialog
  const openPopup = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const closePopup = () => {
    setOpen(false);
  };

  // Function to handle input changes in the form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Validate input fields
      if (!formData.itemName) {
        // Show an error toast
        toast.error("Please fill in the required field (Item Name)");
        return;
      }

      if (formData.notify && !formData.email) {
        // Show an error toast if notify is checked and email is empty
        toast.error("Email is required for notification");
        return;
      }

      // Use the Email.js service ID, template ID, and user ID
      const emailjsParams = {
        service_id: "service_e7n4xkn",
        template_id: "template_o2rtvgf",
        user_id: "JWcTPY9Mc8Ga_4kke",
        template_params: {
          name: formData.name || "N/A",
          email: formData.email || "N/A",
          itemName: formData.itemName,
          notify: formData.notify ? "Yes" : "No",
        },
      };

      // Send email using Email.js
      const response = await emailjs.send(
        "default_service",
        "template_o2rtvgf",
        emailjsParams.template_params,
        emailjsParams.user_id
      );

      console.log(response);
      // Show a success toast
      toast.success("Message sent!");
      closePopup();
    } catch (error) {
      console.error("Error sending email:", error);
      // Show an error toast
      toast.error("Error sending email");
    }
  };

  // Assign the openPopup function to the ref
  React.useImperativeHandle(ref, () => ({
    openPopup,
  }));

  return (
    <>
      {/* Dialog for the modal */}
      <Dialog
        open={open}
        onClose={closePopup}
        fullWidth>
        <DialogTitle>
          Something missing? {/* Close button */}
          <IconButton
            onClick={closePopup}
            style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Dialog content text */}
            You cannot find an item? Please let us know what other items you have a question about.
          </DialogContentText>
          <Stack
            spacing={2}
            marginTop={2}>
            {/* Form fields */}
            <TextField
              variant="outlined"
              label="Your name (optional)"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Email (optional)"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Item name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  name="notify"
                  checked={formData.notify}
                  onChange={handleChange}
                />
              }
              label="Inform me when the item is added (your email is required)"
            />
            {/* Submit button */}
            <Button
              variant="contained"
              style={{ backgroundColor: "rgba(92, 146, 114, 1)" }}
              onClick={handleSubmit}
              disabled={!formData.itemName || (formData.notify && !formData.email)}>
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Toast container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
});

// Assigning a display name to the component for debugging and documentation
ModalPopup.displayName = "ModalPopup";

export default ModalPopup;
