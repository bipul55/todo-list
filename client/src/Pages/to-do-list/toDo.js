import React, { useState, useContext, useEffect } from "react";
import { LogedUser } from "../../App";
import "./toDo.scss";
import { useParams } from "react-router-dom";
import { getListFromId } from "../../Api/getListFromId";
import AddToDo from "../../Components/addTodo/addTodo";
import ToDoListBox from "../../Components/toDoListBox/toDoListBox";
import { IoIosCloudDone, IoMdAdd } from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { changeToDoToDone } from "../../Api/changeToDoToDone";
import { changeToDoToPending } from "../../Api/changeToDoToPending";
import { deleteListItem } from "../../Api/deleteListItem";
const GetRemainingDays = (props) => {
  const [remainingDay, setRemainingDay] = useState(null);
  useEffect(() => {
    var d1 = new Date();
    var d2 = new Date(props.date);
    d1 = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
    setRemainingDay(d1);
  }, []);

  if (remainingDay == 0) {
    return <td style={{ color: "#ff842c" }}>0 day</td>;
  } else if (remainingDay > 0) {
    return <td style={{ color: "blue" }}>{remainingDay} days remaining</td>;
  } else {
    return <td style={{ color: "red" }}>You are Late</td>;
  }
};

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

  const changeToDone = (list_id, toDo_id) => {
    changeToDoToDone(list_id, toDo_id).then((data) => {
      setLists({ ...data });
      setShowToDo(false);
    });
  };
  const changeToPending = (list_id, toDo_id) => {
    changeToDoToPending(list_id, toDo_id).then((data) => {
      setLists({ ...data });
      setShowToDo(false);
    });
  };
  const delListItem = (list_id, toDo_id) => {
    deleteListItem(list_id, toDo_id).then((data) => {
      setLists({ ...data });
      setShowToDo(false);
    });
  };

  useEffect(() => {
    getListFromId(id).then((data) => {
      setLists({ ...data });
    });
  }, []);
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <h1 style={{ marginTop: "20px" }}>{lists.title}</h1>
      <AddToDo
        id={id}
        setValueOfList={setValueOfList}
        show={showToDo}
        onHide={() => setShowToDo(false)}
      />

      <br />
      <br />
      <div
        className="btn btn-light"
        style={{
          border: "0.5px solid #000",
          marginBottom: "10px",
          alignSelf: "baseline",
        }}
        onClick={() => {
          setShowToDo(true);
        }}
      >
        <IoMdAdd />
        Add
      </div>

      {lists.listItems && lists.listItems.length > 0 ? (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Task </th>
                <th scope="col">Status</th>
                <th scope="col">Days Remaining</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.listItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.text}</td>
                    <td scope="row">
                      {item.status == "done" ? (
                        <IoIosCloudDone
                          style={{ color: "blue" }}
                          className="icon"
                        />
                      ) : (
                        <MdPendingActions
                          style={{ color: "red" }}
                          className="icon"
                        />
                      )}

                      {item.status}
                    </td>
                    <GetRemainingDays date={item.dueDate} />
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          margin: "auto",
                          width: "50%",
                        }}
                      >
                        {item.status == "done" ? (
                          <MdPendingActions
                            className="icon"
                            onClick={() => changeToPending(id, item._id)}
                          />
                        ) : (
                          <IoIosCloudDone
                            className="icon"
                            onClick={() => changeToDone(id, item._id)}
                          />
                        )}

                        <AiOutlineDelete
                          className="icon"
                          onClick={() => delListItem(id, item._id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
