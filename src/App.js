import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./1560.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoitems: ["python", "react"],
      message: ""
    };
  }

  addItem(e) {
    e.preventDefault();
    const { todoitems } = this.state;
    const newItem = this.newItem.value;
    const isOnTheList = todoitems.includes(newItem);
    if (isOnTheList) {
      this.setState({
        message: "this item is already on your to do list"
      });
    } else {
      newItem !== "" &&
        this.setState({
          todoitems: [...this.state.todoitems, newItem],
          message: ""
        });
    }
    this.addForm.reset();
  }
  removeItems(item) {
    const newToDOItem = this.state.todoitems.filter(todoitems => {
      return todoitems !== item;
    });
    this.setState({
      todoitems: [...newToDOItem]
    });

    if (newToDOItem.length === 0) {
      this.setState({
        message: "no item on your to do list please add!!!"
      });
    }
  }

  clearList() {
    this.setState({
      todoitems: [],
      message: "Your to do list is cleared !"
    });
  }

  render() {
    const { todoitems } = this.state;
    return (
      <div>
        <header>
          <h1>To do list</h1>
          <img src={logo} alt="logo" />

          <form
            ref={input => {
              this.addForm = input;
            }}
            onSubmit={e => {
              this.addItem(e);
            }}
          >
            <center>
              <div className="form-group">
                <lable className="sr-only" htmlFor="newItemInput">
                  Add new item
                </lable>
                <input
                  ref={input => {
                    this.newItem = input;
                  }}
                  type="text"
                  placeholder="do not sit idle"
                  className="form-control"
                  id="newItemInput"
                />

                <button className="btn btn-primary">Add</button>
              </div>
            </center>
          </form>
        </header>

        <div className="content">
          {(this.state.message !== "" || todoitems.length === 0) && (
            <p className="message text-danger">{this.state.message}</p>
          )}
          {todoitems.length > 0 && (
            <table className="table">
              <caption>To do list</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Items</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {todoitems.map((item, index) => {
                  return (
                    <tr key={item}>
                      <th scope="row">{index + 1}</th>
                      <td>{item}</td>
                      <td>
                        <button
                          onClick={e => this.removeItems(item)}
                          type="button"
                          className="btn btn-default btn-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">&nbsp;</td>
                  <td className="text text-right">
                    <button
                      className="btn btn-default btn-sm"
                      onClick={e => this.clearList()}
                    >
                      Clear all
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default App;
