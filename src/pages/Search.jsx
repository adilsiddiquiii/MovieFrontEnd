import { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchHandler = async () => {
    try {
      const res = await axios.get(
        `https://moviebackend-mzck.onrender.com/api/v1/movies/search?query=${query}`
      );
      setMovies(res.data.movies);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TextField
        label="Search movie"
        fullWidth
        margin="normal"
        onChange={(e) => setQuery(e.target.value)}
      />

      <Button variant="contained" onClick={searchHandler}>
        Search
      </Button>

      <Grid container spacing={2} mt={2}>
        {movies.map((movie) => (
          <Grid item xs={12} md={4} key={movie._id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
