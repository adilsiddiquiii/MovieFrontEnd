import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://moviebackend-mzck.onrender.com/api/v1/movies/${id}`
        );
        setMovie(res.data.movie);
      } catch (error) {
        alert(error.response?.data?.message);
      }
    };

    fetchMovie();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://moviebackend-mzck.onrender.com/api/v1/movies/${id}`,
        movie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie updated successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (!movie) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Loading movie...
      </p>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={submitHandler}
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Edit Movie
        </h2>

        {/* TITLE */}
        <label style={{ fontWeight: "bold" }}>Title</label>
        <input
          style={inputStyle}
          placeholder="Movie title"
          value={movie.title}
          onChange={(e) =>
            setMovie({ ...movie, title: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <label style={{ fontWeight: "bold" }}>Description</label>
        <textarea
          style={{ ...inputStyle, height: "80px" }}
          placeholder="Movie description"
          value={movie.description}
          onChange={(e) =>
            setMovie({ ...movie, description: e.target.value })
          }
        />

        {/* RATING */}
        <label style={{ fontWeight: "bold" }}>Rating</label>
        <input
          style={inputStyle}
          placeholder="Rating"
          value={movie.rating}
          onChange={(e) =>
            setMovie({ ...movie, rating: e.target.value })
          }
        />

        {/* DURATION */}
        <label style={{ fontWeight: "bold" }}>Duration (minutes)</label>
        <input
          style={inputStyle}
          placeholder="Duration"
          value={movie.duration}
          onChange={(e) =>
            setMovie({ ...movie, duration: e.target.value })
          }
        />

        {/* IMAGE */}
        <label style={{ fontWeight: "bold" }}>Image URL</label>
        <input
          style={inputStyle}
          placeholder="Image URL"
          value={movie.image || ""}
          onChange={(e) =>
            setMovie({ ...movie, image: e.target.value })
          }
        />

       

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
