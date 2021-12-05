import react, { useState } from "react";
import { Link } from "react-router-dom";
import "./toDoListBox.scss";
import { changeToDoToDone } from "../../Api/changeToDoToDone";
import { changeToDoToPending } from "../../Api/changeToDoToPending";

const ToDoListBox = (props) => {
  const changeToDone = () => {
    console.log("clicking");
    changeToDoToDone(props.id, props.data._id).then((data) => {
      props.setValueOfList(data);
    });
  };
  const changeToPending = () => {
    console.log("here");
    changeToDoToPending(props.id, props.data._id).then((data) => {
      props.setValueOfList(data);
    });
  };
  return (
    <div className={`toDolistBox ${props.data.status}`}>
      <div className="card text-center">
        <div className="card-header">
          <div
            style={{
              display: "flex",
              gap: "60%",
            }}
          >
            <p
              className="card-text"
              style={{
                fontSize: "12px",
              }}
            >
              Status: {props.data.status}
            </p>
            <div>
              {props.data.status === "pending" ? (
                <div
                  className="btn btn-dark"
                  onClick={changeToDone}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Change to Done"
                >
                  Pending
                </div>
              ) : (
                <div
                  className="btn btn-primary"
                  onClick={changeToPending}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Change to Pending"
                >
                  Done
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.data.text}</h5>
        </div>
      </div>
    </div>
  );
};

export default ToDoListBox;
