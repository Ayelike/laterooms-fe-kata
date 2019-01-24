export const getFacilities = (hotelData) => {
    const facilities = [];

    Object.keys(hotelData).forEach(function(keyHotel) {
        Object.keys(hotelData[keyHotel].facilities).forEach(function(keyFacility) {
            if (!facilities.includes(hotelData[keyHotel].facilities[keyFacility])) {
                facilities.push(hotelData[keyHotel].facilities[keyFacility]);
            }
        });
    });
    
    return SortAlphabetical(facilities);
}

export const SortAlphabetical = (arrayToSort) => {
    return arrayToSort.sort(function(a, b) {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    });
}