import react, { useState, useContext } from "react";
import "./addToDoList.scss";
import { addNewList } from "../../Api/addNewList";
import { LogedUser } from "../../App";
import { Modal, Button } from "react-bootstrap";

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
    if (topic.length > 0 && description.length > 0) {
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
    } else {
      alert("Enter all the parameters");
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
          <div className="addToDoList">
            <form onChange={change_data}>
              Topic:{" "}
              <input
                type="text"
                id="topic"
                className="form-control"
                value={topic}
              />
              Description:{" "}
              <input
                type="text"
                id="description"
                className="form-control"
                value={description}
              />
              {/* <div className="btn btn-primary btn-lg"></div> */}
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addList}>Add List</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddList;
