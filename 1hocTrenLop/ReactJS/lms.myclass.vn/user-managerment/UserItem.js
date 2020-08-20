import React, { Component } from "react";

class UserItem extends Component {
  render() {
    return (
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <button
            className="btn btn-info mr-2"
            data-toggle="modal"
            data-target="#modelIdUser"
          >
            Edit
          </button>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    );
  }
}

export default UserItem;
