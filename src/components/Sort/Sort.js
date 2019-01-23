import React from 'react';
import { connect } from 'react-redux';
import { updateSort } from '../../actions'; 

class Sort extends React.Component {
    render() {
        return (
            <div className="sort">
                <label htmlFor="ddlSortBy">Sort by: </label>
                <select id="ddlSortBy" onChange={(event) => {this.props.updateSort(event.target.value)}} value={this.props.sortBy}>
                    <option value="hotelName">Hotel Name</option>
                    <option value="starRatingAsc">Star Rating (Asc)</option>
                    <option value="starRatingDesc">Star Rating (Desc)</option>
                </select>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    sortBy: state.filterAndSortReducer.sortBy,
});

export default connect(mapStateToProps, { updateSort })(Sort);