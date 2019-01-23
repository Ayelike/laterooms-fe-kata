import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../actions'; 
import hotelData from '../data/hotels.json';

//get unique list of hotel facilities
const facilities = [];

for (const hotel of hotelData) {
    for (const facility of hotel.facilities) {
        if (facilities.indexOf(facility) < 0) {
            facilities.push(facility);
        }
    }
}

//sort facilities
facilities.sort(function(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
});

class Filter extends React.Component {
    constructor() {
        super();

        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter(event) {
        let filter = this.props.filterBy.slice();
        const filterChecked = event.target.checked;
        const filterValue = event.target.value;

        if (filterChecked) {
            if (filter.indexOf(filterValue) < 0) {
                filter.push(filterValue);
            }
        } else {
            filter = filter.filter(facility => facility !== filterValue);
        }

        //sort filter
        filter.sort(function(a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });

        this.props.updateFilter(filter);
    }

    render() {
        const filters = facilities.map((facility, index) => (
            <div className="filter__filter-item" key={index}>
                <input id={'facilityFilter' + index} onChange={this.changeFilter} type="checkbox" value={facility} />
                <label className="filter__filter-item__label" htmlFor={'facilityFilter' + index}>{facility}</label>
            </div>
        ));

        return (
            <div className="filter">
                <p>Filter by:</p>
                <div className="filter__filters">
                    {filters}
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    filterBy: state.filterAndSortReducer.filterBy,
});

export default connect(mapStateToProps, { updateFilter })(Filter);