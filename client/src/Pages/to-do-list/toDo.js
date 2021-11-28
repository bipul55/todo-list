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
  const { id } = useParams();
  let navigate = useNavigate();

  const setValueOfList = (list) => {
    console.log(list, "updating");
    setLists({ ...list });
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
      <AddToDo id={id} setValueOfList={setValueOfList} />

      <br />
      <br />
      <br />
      {lists.listItems &&
        lists.listItems.map((item, index) => {
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
    </div>
  );
};

export default ToDO;
