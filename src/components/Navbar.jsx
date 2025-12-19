import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logoutHandler = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        
        <Button color="inherit" component={Link} to="/">
          Movies
        </Button>

        <Button color="inherit" component={Link} to="/search">
          Search
        </Button>

        {user?.role === "admin" && (
          <Button color="inherit" component={Link} to="/admin/add">
            Add Movie
          </Button>
        )}

        <Box sx={{ flexGrow: 1 }} />

        
        {user ? (
          <Button color="inherit" onClick={logoutHandler}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
