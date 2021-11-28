import React, { useContext, useEffect } from "react";
import { LogedUser } from "../../App";
import { Spinner } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../login/login";
import Main from "../main/main";
import Register from "../register/register";
import ToDO from "../to-do-list/toDo";
const Router1 = () => {
  const [user, setuser] = useContext(LogedUser);

  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          {user.data ? (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/to-do/:id" element={<ToDO />} />
            </Routes>
          ) : (
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </div>
      </Router>
    </div>
  );
};
export default Router1;
