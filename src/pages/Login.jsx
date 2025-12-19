import { useContext, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "https://moviebackend-mzck.onrender.com/api/v1/auth/login",
        formData
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
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
          Login
        </Button>
      </form>

      <Box mt={2}>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </Box>
    </Box>
  );
}
