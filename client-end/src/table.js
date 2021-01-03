import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';


class Table extends Component {
    constructor(props) {
    	super(props);
    	
    }


	render() {
		return (
		
          <tr>
	            <td>{this.props.ticket.ticketID}</td>
	            <td>{this.props.ticket.name}</td>
	            <td>{this.props.ticket.comment}</td>
	            <td>{this.props.ticket.EmpID}</td>
          </tr>
         


	    )
	}
}


Table.propTypes = {
	ticketID: PropTypes.string,
    name: PropTypes.string,
    EmpID: PropTypes.number,
    comment: PropTypes.string
}


export default Table;