import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, refreshMovies }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://moviebackend-mzck.onrender.com/api/v1/movies/${movie._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie deleted successfully");
      refreshMovies();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div
      style={{
        width: "260px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
     
      <img
        src={
          movie.image ||
          "https://via.placeholder.com/300x200?text=No+Image"
        }
        alt={movie.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
        }}
      />

      
      <div style={{ padding: "12px" }}>
        <h3 style={{ margin: "0 0 8px 0" }}>{movie.title}</h3>

        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginBottom: "8px",
          }}
        >
          {movie.description}
        </p>

        <p style={{ margin: "4px 0" }}>
          <b>⭐ Rating:</b> {movie.rating}
        </p>

        <p style={{ margin: "4px 0" }}>
          <b>⏱ Duration:</b> {movie.duration} min
        </p>

      
        {user?.role === "admin" && (
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => navigate(`/admin/edit/${movie._id}`)}
              style={{
                padding: "6px 10px",
                border: "none",
                backgroundColor: "#1976d2",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={deleteHandler}
              style={{
                padding: "6px 10px",
                marginLeft: "8px",
                border: "none",
                backgroundColor: "#d32f2f",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

eval