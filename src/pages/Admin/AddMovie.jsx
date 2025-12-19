import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

export default function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    image: "", // ✅ added
  });

  const submitHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://moviebackend-mzck.onrender.com/api/v1/movies",
        movie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie added successfully");
      setMovie({
        title: "",
        description: "",
        rating: "",
        releaseDate: "",
        duration: "",
        image: "",
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5}>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={movie.title}
        onChange={(e) =>
          setMovie({ ...movie, title: e.target.value })
        }
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={movie.description}
        onChange={(e) =>
          setMovie({ ...movie, description: e.target.value })
        }
      />

      <TextField
        label="Rating"
        type="number"
        fullWidth
        margin="normal"
        value={movie.rating}
        onChange={(e) =>
          setMovie({ ...movie, rating: e.target.value })
        }
      />

      <TextField
        label="Release Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={movie.releaseDate}
        onChange={(e) =>
          setMovie({ ...movie, releaseDate: e.target.value })
        }
      />

      <TextField
        label="Duration (min)"
        type="number"
        fullWidth
        margin="normal"
        value={movie.duration}
        onChange={(e) =>
          setMovie({ ...movie, duration: e.target.value })
        }
      />

      {/* ✅ IMAGE URL FIELD */}
      <TextField
        label="Image URL"
        fullWidth
        margin="normal"
        value={movie.image}
        onChange={(e) =>
          setMovie({ ...movie, image: e.target.value })
        }
      />

     

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={submitHandler}
      >
        Add Movie
      </Button>
    </Box>
  );
}
