import React, { useState, useContext, useEffect } from "react";
import { LogedUser } from "../../App";
import "./toDo.scss";
import { useParams } from "react-router-dom";
import { getListFromId } from "../../Api/getListFromId";
import AddToDo from "../../Components/addTodo/addTodo";
import ToDoListBox from "../../Components/toDoListBox/toDoListBox";

import { useNavigate } from "react-router-dom";

const ToDO = () => {
  const [lists, setLists] = useState({});
  const [user, setUser] = useContext(LogedUser);
  const [showToDo, setShowToDo] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();

  const setValueOfList = (list) => {
    setLists({ ...list });
    setShowToDo(false);
  };
  useEffect(() => {
    getListFromId(id).then((data) => {
      setLists({ ...data });
    });
  }, []);
  useEffect(() => {
    console.log("uesr", user);
    if (!user.email) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <h1>{lists.title}</h1>
      <AddToDo
        id={id}
        setValueOfList={setValueOfList}
        show={showToDo}
        onHide={() => setShowToDo(false)}
      />

      <br />
      <br />
      <br />
      <div
        className="btn btn-primary"
        onClick={() => {
          setShowToDo(true);
        }}
      >
        Add New Todo Item
      </div>

      {lists.listItems && lists.listItems.length > 0 ? (
        <>
          {lists.listItems.map((item, index) => {
            return (
              <div key={index}>
                <ToDoListBox
                  data={item}
                  id={id}
                  setValueOfList={setValueOfList}
                />
              </div>
            );
          })}
        </>
      ) : (
        <h6
          style={{
            marginTop: "50px",
          }}
        >
          {" "}
          No todo items{" "}
        </h6>
      )}
    </div>
  );
};

export default ToDO;
