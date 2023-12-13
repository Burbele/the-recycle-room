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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    } catch (error) {
      console.error("Authentication error:", error.message);
    } finally {
      onClose && onClose();
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}>
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
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
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
      </DialogContent>
    </Dialog>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
  onClose: PropTypes.func,
};

export default Login;
