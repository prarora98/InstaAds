import React from "react";
import Header from "./components/layout/header/Header";
import Profile from "./components/layout/profile/Profile";
import Home from "./components/layout/home/Home";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount() {
    if (localStorage.authToken) {
      this.fetchUser(JSON.parse(localStorage.authToken));
    }
  }

  fetchUser = async token => {
    try {
      const req = await axios.get("http://localhost:3000/api/user", {
        headers: {
          // TODO: Add dynamic token
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGNmZjRmNTFhOTFlOTAwMjQ5MzIzYzciLCJpYXQiOjE1NzQzMjczOTAsImV4cCI6MTU3NTUzNjk5MH0.Q-95CB7otdxXXL2i8XGseuajKCxtMX6J5GSGVrw44JA"
        }
      });

      localStorage.setItem("authToken", JSON.stringify(token));
      // Update the state
      this.setState({ user: req.data.user });
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Returns routes based on condition
   * @param {string}
   * @return {object}
   */
  Routes = user => {
    // Protected Routes
    if (user) {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route component={PageNotFound} />
        </Switch>
      );
    }
    // Unprotected Routes
    else {
      return (
        <Switch>{/* TODO: Add routes that doesn't requires user auth*/}</Switch>
      );
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        {/*TODO: Add last default Route for error 404 */}
        {this.Routes(this.state.user)}
      </div>
    );
  }
}

export default App;
