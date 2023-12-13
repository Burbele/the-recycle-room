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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const auth = getAuth();

      // Authenticate the user with the provided email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // If authentication is successful, trigger the onLogin callback
      onLogin && onLogin();

      // Log the user information to the console
      console.log("User signed in:", userCredential.user);

      // Show success toast
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Authentication error:", error.message);

      // Show error toast
      toast.error("Login failed. Check your credentials.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      onClose && onClose();
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={onClose}
        fullWidth>
        <DialogTitle>
          Sign in as a moderator
          <IconButton
            onClick={onClose}
            style={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your moderator credentials.</DialogContentText>
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

            <Button
              variant="contained"
              style={{ backgroundColor: "rgba(92, 146, 114, 1)" }}
              onClick={handleLogin}>
              Sign in
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      {/* Render ToastContainer inside the Dialog */}
      <ToastContainer
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
  onClose: PropTypes.func,
};

export default Login;
