import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
   constructor(props) {
    	super(props);
    	
    }



  
	render() {

        console.log(this.props.getTickets)

		return (
          <div class="pagination" onClick={() => console.log('Click worked!') }>
            <li><a>1</a></li>
            <li><a>2</a></li>
          </div>
		)
	}
}

Pagination.propTypes = {
	getTickets: PropTypes.array
}

export default Pagination;