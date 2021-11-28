import React, { useState, useContext, useEffect } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { GooglePlusCircleFilled } from "@ant-design/icons";
import { LogedUser } from "../../App";
import { login } from "../../Api/login";
const Login = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useContext(LogedUser);

  let navigate = useNavigate();

  const log = () => {
    var mail = document.getElementById("email").value;
    var pw = document.getElementById("password").value;
    if (mail && pw) {
      login(mail, pw)
        .then((data) => {
          if (data.info) {
            setError(data.info);
          }
          if (data.accessToken) {
            var token = data.accessToken;
            localStorage.setItem("user", JSON.stringify(token));
            window.location.reload(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Please enter all the credentials");
    }
  };
  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="login">
      <div className="wrapper">
        <h2 style={{ margin: "20px 0px" }}>Login</h2>
        <form>
          <p>
            Email
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            type="text"
            id="email"
            placeholder="you@example.com"
            className="form-control"
            required
          />

          <p>
            Password
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            className="form-control"
            required
          />
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            {error}
          </p>
          <br />
          <a className="btn btn-primary btn-lg" onClick={log}>
            CONTINUE{" "}
          </a>

          <br />

          <p
            style={{
              textAlign: "center",
            }}
          >
            Dont have an account?{" "}
            <Link to="/register">
              <span
                style={{
                  color: "#35bf33",
                }}
              >
                Register
              </span>
            </Link>
          </p>

          <p className="bottom">
            By sign up you are agreeing to our Privacy Policy. and Terms &
            Conditions
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
