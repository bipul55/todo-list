import react, { useState, useContext } from "react";
import "./addTodo.scss";
import { LogedUser } from "../../App";
import { addNewToDoInList } from "../../Api/addNewToDoInList";
import { Modal, Button } from "react-bootstrap";

const AddToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [user, setUser] = useContext(LogedUser);

  const addTodo = () => {
    if (toDo != "") {
      addNewToDoInList(props.id, toDo)
        .then((data) => {
          console.log(data);
          props.setValueOfList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add List</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addTodo}>Add Todo</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddToDo;
