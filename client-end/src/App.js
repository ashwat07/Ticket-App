import React, { Component } from "react";
import Header from "./header.js";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Table from "./table";
import { Button } from "react-bootstrap";

import "./App.css";

const GetTickets = gql`
  {
    getTickets {
      name
      EmpID
      comment
      ticketID
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      ticketPerPage: 4,
    };
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    let {
      data: { loading, refetch, getTickets },
    } = this.props;
    let { currentPage, ticketPerPage } = this.state;
    const indexOfLastTicket = currentPage * ticketPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketPerPage;

    if (loading) {
      return <h4>Loading..</h4>;
    }

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(getTickets.length / ticketPerPage); i++) {
      pageNumbers.push(i);
    }

    const mapped = pageNumbers.map((num, id) => {
      return (
        <li key={id}>
          <a id={num} onClick={this.handleClick}>
            {num}
          </a>
        </li>
      );
    });

    const Data = getTickets
      .slice(indexOfFirstTicket, indexOfLastTicket)
      .map((ticket, id) => {
        return <Table ticket={ticket} key={id} />;
      });

    const Pagination = <span className="pagination">{mapped}</span>;

    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        
          <Button
            className="lookup"
            bsStyle="info"
            bsSize="xsmall"
            onClick={() => refetch()}
          >
           LookUp
          </Button>
          <br />
          <br />
          <div className="container" style={{ overflowX: "auto" }}>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>TicketID</th>
                    <th>Name</th>
                    <th>Comment</th>
                    <th>EmpID</th>
                  </tr>
                </thead>
                <tbody>{Data}</tbody>
              </table>
            </div>
          </div>
          {Pagination}
      </div>
    );
  }
}

export default compose(graphql(GetTickets))(App);
