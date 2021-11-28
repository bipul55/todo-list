import react, { useState } from "react";
import { Link } from "react-router-dom";
import "./toDoListBox.scss";
import { changeToDoToDone } from "../../Api/changeToDoToDone";
import { changeToDoToPending } from "../../Api/changeToDoToPending";

const ToDoListBox = (props) => {
  const changeToDone = () => {
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
        <div className="card-body">
          <h5 className="card-title">{props.data.text}</h5>
          <p className="card-text">{props.data.status}</p>
          {props.data.status === "pending" ? (
            <div className="btn btn-primary" onClick={changeToDone}>
              Change to done
            </div>
          ) : (
            <div className="btn btn-dark" onClick={changeToPending}>
              change to pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoListBox;
