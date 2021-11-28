import react, { useState, useContext } from "react";
import "./addToDoList.scss";
import { addNewList } from "../../Api/addNewList";
import { LogedUser } from "../../App";

const AddList = (props) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useContext(LogedUser);

  const change_data = (e) => {
    switch (e.target.id) {
      case "topic":
        setTopic(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
    }
  };
  const addList = () => {
    addNewList(topic, description, user.email)
      .then((data) => {
        if (data.list) {
          props.set_list(data.list);
        }
        if (data.error) {
          window.alert(data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="addToDoList">
      <form onChange={change_data}>
        Topic:{" "}
        <input type="text" id="topic" className="form-control" value={topic} />
        Description:{" "}
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
        />
        <div className="btn btn-primary btn-lg" onClick={addList}>
          Add List
        </div>
      </form>
    </div>
  );
};

export default AddList;
