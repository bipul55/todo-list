import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import "./main.scss";
import { LogedUser } from "../../App";
import { useNavigate } from "react-router-dom";
import AddList from "../../Components/addList/addList";
import ListBox from "../../Components/listBox/listBox";
import { getAllTheLists } from "../../Api/getAllTheList";
const Main = () => {
  const [lists, setLists] = useState([]);
  const [showAddList, setShowAddList] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useContext(LogedUser);
  const logout = async () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };

  useEffect(() => {
    getAllTheLists(user.email).then((data) => {
      setLists([...data.reverse()]);
    });
  }, []);
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="main">
      <h1>{user.name}</h1>
      <div
        className="btn btn-dark btn-lg"
        onClick={logout}
        style={{
          position: "absolute",
          right: "20px",
          top: "20px",
        }}
      >
        Logout
      </div>
      <AddList
        set_list={(list) => {
          var temp = lists;
          temp.push(list);
          setLists([...temp]);
          setShowAddList(false);
        }}
        show={showAddList}
        onHide={() => setShowAddList(false)}
      />
      <br />
      <br />
      <div
        className="btn btn-primary"
        onClick={() => {
          setShowAddList(true);
        }}
      >
        ADD New List
      </div>
      <div
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        {lists.length > 0 ? (
          <div className="row">
            {lists.map((list, index) => {
              return (
                <div key={index} className="col-lg-4">
                  <ListBox data={list} />
                </div>
              );
            })}
          </div>
        ) : (
          <h6
            style={{
              marginTop: "50px",
            }}
          >
            No lists
          </h6>
        )}
      </div>
    </div>
  );
};
export default Main;
