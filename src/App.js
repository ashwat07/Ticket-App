import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Button from "@material-ui/core/Button";
// import { withStyles } from '@material-ui/core/styles';
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "react-bootstrap";
// import Input from '@material-ui/core/Input';
import TextField from "@material-ui/core/TextField";

import TicketHeader from "./ticketheader.js";

import "./App.css";

const CreateTicket = gql`
  mutation($name: String!, $EmpID: ID!, $comment: String!) {
    createTicket(name: $name, EmpID: $EmpID, comment: $comment) {
      name
      EmpID
      comment
    }
  }
`;

const GetTickets = gql`
  {
    getTickets {
      name
      EmpID
      comment
    }
  }
`;

class App extends Component {
  state = {
    text: "",
    nameError: "",
    empIDError: "",
    commentError: "",
    open: false,
    onHide: false,
    blankError: "",
    error: "",
  };

  createTicket = async (name, EmpID, comment) => {
    try {
      await this.props.createTicket({
        variables: {
          name,
          EmpID,
          comment,
        },
      });
    } catch (e) {
      throw e;
    }
  };

  handleClick = (e) => {
    e.preventDefault();

    this.setState({
      open: true,
    });
  };

  handleHide = (e) => {
    this.setState({
      open: false,
      blankError: "",
      nameError: "",
      empIDError: "",
      commentError: "",
      Name: "",
      Comment: "",
      EmpID: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    return !this.state.Name || !this.state.EmpID || !this.state.Comment
      ? this.setState({
          blankError: "Please enter all details!",
        })
      : (this.setState({ blankError: "" }),
        this.check() ? console.log("Returned Error") : null);
  };

  async check() {
    const { nameError, empIDError, commentError } = this.state;

    let mesError1,
      mesError2,
      mesError3 = "";

    mesError1 = (await (this.state.Name && this.state.Name.length < 4))
      ? (this.setState({ nameError: "Name should be more than 4 chars" }),
        this.setState({ empIDError: "", commentError: "" }))
      : this.state.Name;

    mesError2 = (await (this.state.EmpID &&
      !isNaN(this.state.EmpID) &&
      this.state.EmpID.length < 4))
      ? (this.setState({ empIDError: "Please enter valid employee ID" }),
        this.setState({ nameError: "", commentError: "" }))
      : this.state.EmpID;

    mesError3 = (await (this.state.Comment && this.state.Comment.length < 10))
      ? (this.setState({ commentError: "Comment is short!!" }),
        this.setState({ nameError: "", empIDError: "" }))
      : this.state.Comment;

    if (mesError1 && mesError2 && mesError3) {
      this.createTicket(mesError1, mesError2, mesError3);
      this.setState({ open: false });
    } else {
      return nameError || empIDError || commentError;
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.switch();
  };

  switch = () => {
    if (this.state.Name && this.state.Name.length >= 3) {
      this.setState({ nameError: "" });
    }

    if (this.state.EmpID && this.state.EmpID.length >= 3) {
      this.setState({ empIDError: "" });
    }

    if (this.state.Comment && this.state.Comment.length >= 9) {
      this.setState({ commentError: "" });
    }
  };

  render() {
    const {
      data: { loading, todos },
    } = this.props;
    console.log(this.props.data);

    let { blankError, nameError, empIDError, commentError } = this.state;

    let otherError = "";

    let submitButton = (
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => this.handleSubmit(e)}
      >
        Submit
      </Button>
    );

    if (blankError) {
      otherError = (
        <div style={{ color: "#FF0000" }}>
          <h4>{blankError}</h4>
          <br />
          <br />
        </div>
      );
    } else if (nameError) {
      otherError = (
        <div style={{ color: "#FF0000" }}>
          <h4>{nameError}</h4>
          <br />
          <br />
        </div>
      );
    } else if (empIDError) {
      otherError = (
        <div style={{ color: "#FF0000" }}>
          <h4>{empIDError}</h4>
          <br />
          <br />
        </div>
      );
    } else if (commentError) {
      otherError = (
        <div style={{ color: "#FF0000" }}>
          <h4>{commentError}</h4>
          <br />
          <br />
        </div>
      );
    }

    return (
      <div className="App">
        <TicketHeader />
        <div className="modal-container" style={{ height: 200 }}>
          <Modal
            show={this.state.open}
            onHide={this.handleHide}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Create a Ticket!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div>
                  <label id="label">Enter Name:</label>
                  <TextField
                    name="Name"
                    fullWidth
                    placeholder="Enter your Name"
                    onChange={(e) => this.handleChange(e)}
                  />
                  <br />
                  <label id="label">Enter EmpID:</label>
                  <TextField
                    name="EmpID"
                    fullWidth
                    placeholder="Enter your EmpID"
                    onChange={(e) => this.handleChange(e)}
                  />
                  <br />
                  <label id="label">Enter Comment:</label>
                  <div id="comment">
                    <TextField
                      name="Comment"
                      fullWidth
                      placeholder="Enter Comment"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <br />
                  {submitButton}
                  {otherError}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={this.handleHide}
                variant="outlined"
                color="secondary"
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Button
            variant="fab"
            mini
            color="secondary"
            aria-label="Add"
            onClick={this.handleClick}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(CreateTicket, { name: "createTicket" }),
  graphql(GetTickets)
)(App);
