import React from 'react';
import { connect } from 'react-redux';
import data from '../data/hotels.json';

//assets
import star from '../assets/images/star.png';
import starFull from '../assets/images/starFull.png';

const Stars = props => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (props.rating > i) {
            stars.push(<img alt="Filled in star" className="stars__star" key={'star' + i} src={starFull} />);
        } else {
            stars.push(<img alt="Empty star" className="stars__star" key={'star' + i} src={star} />);
        }
    }

    return (
        <div className="stars">
            {stars}
        </div>
    );
    
};

class HotelList extends React.Component {
    render() {
        let hotelData = JSON.parse(JSON.stringify(data));

        //FILTER
        //Find hotels that don't meet the current filter
        for (const hotelIndex in hotelData) {
            hotelData[hotelIndex].remove = false;

            for (const filter of this.props.filterBy) {
                if (hotelData[hotelIndex].facilities.indexOf(filter) < 0) {
                    hotelData[hotelIndex].remove = true;
                }
            }
        }

        //remove filtered hotels
        hotelData = hotelData.filter(hotel => hotel.remove === false);

        //SORT
        //Always sort hotels by name first
        //Even if we sort by rating after, matching ratings will still be in name order
        hotelData.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

        //Sort by star rating if required
        if (this.props.sortBy === 'starRatingAsc') {
            //rating ascending
            hotelData.sort(function(a, b) {
                if (a.starRating < b.starRating) return -1;
                if (a.starRating > b.starRating) return 1;
                return 0;
            });
        } else if (this.props.sortBy === 'starRatingDesc') {
            //rating descending
            hotelData.sort(function(a, b) {
                if (a.starRating < b.starRating) return 1;
                if (a.starRating > b.starRating) return -1;
                return 0;
            });
        }

        const hotels = hotelData.map((hotel, index) => (
            <article className="hotel-list__item" key={index}>
                <header className="hotel-list__item__header">
                    <h2 className="hotel-list__item__title">{hotel.name}</h2>
                    <div>
                        <p>Rating: {hotel.starRating} stars</p>
                        <Stars rating={hotel.starRating} />
                    </div>
                </header>
                {hotel.facilities.length > 0 &&
                    <p>Facilities: {hotel.facilities.join(', ')}</p>
                }
            </article>
        ));

        return (
            <div className="hotel-list">
                <h2 className="hotel-list__title">
                    Your Hotels
                    {this.props.filterBy.length > 0 &&
                        <span className="hotel-list__title__small">Filtered by: {this.props.filterBy.join(', ')}</span>
                    }
                </h2>
                {hotelData.length > 0 ?
                    <div>
                        {hotels}
                    </div>
                :
                    <div>
                        <p><b>Sorry, no hotels match your search.</b></p>
                        <p>Please try removing some of your filters.</p>
                    </div>
                }
                
            </div>
        );
    }
};

const mapStateToProps = state => ({
    filterBy: state.filterAndSortReducer.filterBy,
    sortBy: state.filterAndSortReducer.sortBy,
});

export default connect(mapStateToProps, null)(HotelList);