export const getFacilities = (hotelData) => {
    const facilities = [];

    for (const hotel of hotelData) {
        for (const facility of hotel.facilities) {
            if (!facilities.includes(facility)) {
                facilities.push(facility);
            }
        }
    }
    
    return SortAlphabetical(facilities);
}

export const SortAlphabetical = (arrayToSort) => {
    return arrayToSort.sort(function(a, b) {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    });
}