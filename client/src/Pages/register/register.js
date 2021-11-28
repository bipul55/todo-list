import React, { useState, useContext, useEffect } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { LogedUser } from "../../App";
import { registerUser } from "../../Api/register";
const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useContext(LogedUser);
  let navigate = useNavigate();

  const register = () => {
    var mail = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password_2").value;

    if (mail && pw1 && pw2 && name) {
      if (pw1 != pw2) {
        setError("Password do not match");
      } else {
        registerUser(mail, pw1, name)
          .then((data) => {
            if (data.info) {
              setError(data.info);
            }
            if (data.registered) {
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setError("Enter all the values");
    }
  };
  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="register">
      <div className="wrapper">
        <h2 style={{ margin: "20px 0px" }}>Register</h2>

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
            Name
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
            id="name"
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
          <p>
            Re-type Password
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
            id="password_2"
            placeholder="Enter Your Password"
            className="form-control"
            required
          />
          <p style={{ color: "red", textAlign: "center", fontSize: "12px" }}>
            {error}
          </p>
          <br />
          <a className="btn btn-primary btn-lg" onClick={register}>
            Register{" "}
          </a>

          <br />

          <p
            style={{
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link to="/login">
              <span
                style={{
                  color: "#35bf33",
                }}
              >
                Login
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

export default Register;
