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
  let navigate = useNavigate();
  const [user, setUser] = useContext(LogedUser);
  const logout = async () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };

  useEffect(() => {
    getAllTheLists(user.email).then((data) => {
      setLists([...data]);
    });
  }, []);
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <div>{user.name}</div>
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
        }}
      />
      <br />
      <br />
      <div className="row">
        {lists.map((list, index) => {
          return (
            <div className="col-lg-4" key={index}>
              <ListBox data={list} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Main;
