import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin, onClose }) => {
  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      // Get the authentication instance
      const auth = getAuth();

      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Call the onLogin callback if provided
      onLogin && onLogin();

      // Log the user information
      console.log("User signed in:", userCredential.user);

      // Show success toast
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Authentication error:", error.message);

      // Show error toast if login fails
      toast.error("Login failed. Check your credentials.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      // Call the onClose callback regardless of success or failure
      onClose && onClose();
    }
  };

  return (
    <>
      {/* Dialog for login */}
      <Dialog
        open={true}
        onClose={onClose}
        fullWidth>
        <DialogTitle>
          Sign in as a moderator
          {/* Close button */}
          <IconButton
            onClick={onClose}
            style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your moderator credentials.</DialogContentText>
          {/* Form inputs */}
          <Stack
            spacing={2}
            marginTop={2}>
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login button */}
            <Button
              variant="contained"
              style={{ backgroundColor: "rgba(92, 146, 114, 1)" }}
              onClick={handleLogin}>
              Sign in
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Toast container for displaying success/error messages */}
      <ToastContainer
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
};

// PropTypes for prop validation
Login.propTypes = {
  onLogin: PropTypes.func,
  onClose: PropTypes.func,
};

export default Login;
