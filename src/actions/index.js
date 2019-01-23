export const updateFilter = (value) => dispatch => {
    dispatch({
        filterBy: value,
        type: 'UPDATE_FILTER',
    });
}

export const updateSort = (value) => dispatch => {
    dispatch({
        sortBy: value,
        type: 'UPDATE_SORT',
    });
}

