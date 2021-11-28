import React, { useState, useEffect, useContext } from "react";
import jwt from "jsonwebtoken";
import "./App.css";
import Router1 from "./Pages/router/router";

export const LogedUser = React.createContext();

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // get user from localstorage
    var loggedInUser = localStorage.getItem("user");
    loggedInUser = JSON.parse(loggedInUser);
    let temp = {};
    // if user if logged in
    if (loggedInUser) {
      jwt.verify(
        loggedInUser,
        process.env.REACT_APP_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            console.log(err);
            return;
          }
          temp.email = user.email;
          temp.name = user.name;
          temp.data = "data";
        }
      );
    } else {
      temp.data = "data";
    }
    // set user in context variable
    setUser({ ...temp });
  }, []);
  return (
    <div className="App">
      <LogedUser.Provider value={[user, setUser]}>
        <Router1 />
      </LogedUser.Provider>
    </div>
  );
}

export default App;
