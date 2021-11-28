import react, { useState, useContext } from "react";
import "./addTodo.scss";
import { LogedUser } from "../../App";
import { addNewToDoInList } from "../../Api/addNewToDoInList";
const AddToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [user, setUser] = useContext(LogedUser);

  const addTodo = () => {
    console.log(props.id, toDo);
    addNewToDoInList(props.id, toDo)
      .then((data) => {
        console.log(data);
        props.setValueOfList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="addToDo">
      To Do:{" "}
      <input
        type="text"
        id="to_do"
        className="form-control"
        value={toDo}
        onChange={(e) => {
          setToDo(e.target.value);
        }}
      />
      <div className="btn btn-primary btn-lg" onClick={addTodo}>
        Add Todo
      </div>
    </div>
  );
};

export default AddToDo;
