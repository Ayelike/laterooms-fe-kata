import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../../actions'; 
import hotelData from '../../data/hotels.json';
import { getFacilities, SortAlphabetical } from '../../utilities';
import './Filter.scss';

//get unique list of hotel facilities
const facilities = getFacilities(hotelData);

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
            if (!filter.includes(filterValue)) {
                filter.push(filterValue);
            }
        } else {
            filter = filter.filter(facility => facility !== filterValue);
        }

        this.props.updateFilter(SortAlphabetical(filter));
    }

    render() {
        if (facilities.length < 1) {
            return null;
        }

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