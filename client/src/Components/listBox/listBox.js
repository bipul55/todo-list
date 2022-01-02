import react, { useState } from "react";
import { Link } from "react-router-dom";
import "./listBox.scss";

const ListBox = (props) => {
  return (
    <div className="listBox">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.data.title}</h5>
          <p className="card-text">{props.data.description}</p>
          <Link to={`/to-do/${props.data._id}`} className="btn btn-primary">
            See List Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListBox;
