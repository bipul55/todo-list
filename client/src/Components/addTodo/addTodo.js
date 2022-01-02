import react, { useState, useContext, useEffect, useCallback } from "react";
import "./addTodo.scss";
import { LogedUser } from "../../App";
import { addNewToDoInList } from "../../Api/addNewToDoInList";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddToDo = (props) => {
  const [toDo, setToDo] = useState("");
  const [user, setUser] = useContext(LogedUser);
  const [date, setDate] = useState(null);

  const addTodo = useCallback(() => {
    if (toDo != "") {
      addNewToDoInList(props.id, toDo, date)
        .then((data) => {
          props.setValueOfList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [toDo, date]);
  const onChangeDate = (e) => {
    setDate(e);
  };
  useEffect(() => {
    const d = new Date();
    setDate(d);
  }, []);
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
            To Do:
            <input
              type="text"
              id="to_do"
              className="form-control"
              value={toDo}
              onChange={(e) => {
                setToDo(e.target.value);
              }}
            />
            <br />
            <>Due Date</>
            <DatePicker selected={date} onChange={onChangeDate} />
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
