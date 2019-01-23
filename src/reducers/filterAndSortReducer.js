const initialState = {
    filterBy: [],
    sortBy: 'hotelName',
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'UPDATE_FILTER':
            return {
                ...state,
                filterBy: action.filterBy,
            };
        case 'UPDATE_SORT':
            return {
                ...state,
                sortBy: action.sortBy,
            };
        default:
            return state;
    }
}