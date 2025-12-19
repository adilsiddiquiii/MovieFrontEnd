import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // Fetch all movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://moviebackend-mzck.onrender.com/api/v1/movies"
        )
        setMovies(res.data.movies);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  // Sorting logic
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "release") {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }

    return 0;
  });

  return (
    <div style={{ padding: "20px" }}>
      {/* SORT DROPDOWN */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="release">Release Date</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      {/* MOVIE LIST */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            refreshMovies={() => setMovies([...movies])}
          />
        ))}
      </div>
    </div>
  );
}
