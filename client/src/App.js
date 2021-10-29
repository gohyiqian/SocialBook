import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  //simulate user logged in
  // const user = false;
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* if user is logged in/exist, show home page, else show register page */}
          {user ? <Home /> : <Register />}
        </Route>

        {/* if user is logged in/exist, redirect to home, else go Login page */}
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>

        {/* if user is logged in/exist, redirect to home, else go Register page */}
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
