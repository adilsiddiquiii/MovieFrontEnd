import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "https://moviebackend-mzck.onrender.com/api/v1/auth/register",
        formData
      );

      if (res.data.success) {
        alert("Signup successful. Please login.");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <form onSubmit={submitHandler}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />

        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
        >
          Signup
        </Button>
      </form>

      <Box mt={2}>
        Already have an account? <Link to="/login">Login</Link>
      </Box>
    </Box>
  );
}
