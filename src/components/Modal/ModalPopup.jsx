import { useState } from "react";
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MdInfoOutline } from "react-icons/md";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalPopup = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemName: "",
    notify: false,
  });

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate input fields
      if (!formData.name || !formData.email || !formData.itemName) {
        // Show an error toast
        toast.error("Please fill in all required fields");
        return;
      }

      // Use the Email.js service ID, template ID, and user ID
      const emailjsParams = {
        service_id: "service_e7n4xkn",
        template_id: "template_o2rtvgf",
        user_id: "JWcTPY9Mc8Ga_4kke",
        template_params: {
          name: formData.name,
          email: formData.email,
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

  return (
    <>
      <IconButton
        onClick={openPopup}
        aria-label="info">
        <Stack
          alignItems="flex-start"
          position="fixed"
          top="3rem"
          right="1.5rem">
          <MdInfoOutline
            fontSize="2rem"
            style={{ color: "rgba(43, 36, 42, 1)" }}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ color: "rgba(43, 36, 42, 1)" }}>
            Help
          </Typography>
        </Stack>
      </IconButton>

      <Dialog
        open={open}
        onClose={closePopup}
        fullWidth>
        <DialogTitle>
          Something missing?{" "}
          <IconButton
            onClick={closePopup}
            style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You cannot find an item? Please let us know what other items you have a question about.
          </DialogContentText>
          <Stack
            spacing={2}
            marginTop={2}>
            <TextField
              variant="outlined"
              label="Your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              label="Email"
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
              label="Inform me when the item is added"
            />
            <Button
              variant="contained"
              style={{ backgroundColor: "rgba(92, 146, 114, 1)" }}
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.itemName}>
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
};

export default ModalPopup;
