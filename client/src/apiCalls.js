import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["geocoding"],
});

let geocoder;

function loadGeocoder() {
    return new Promise((resolve) => {
        resolve(loader.load());
    });
}

async function getLatLngFromPostalCode(postalCode) {
    if (!geocoder) {
        let google = await loadGeocoder();
        geocoder = new google.maps.Geocoder();
    }
    let resultsFromPostal;
    let lat;
    let lng;
    try {
        resultsFromPostal = await geocoder.geocode({
            componentRestrictions: {
                country: "US",
                postalCode: `${postalCode}`,
            },
        });
        lat = resultsFromPostal.results[0].geometry.location.lat();
        lng = resultsFromPostal.results[0].geometry.location.lng();
        return {
            lat,
            lng,
        };
    } catch (e) {
        console.error("An error occured while fetching from geocoder");
        console.log(e);
    }
}

export async function getResultsForPostalCode(postalCode) {
    //use geocoder to get lat and lng for inputed postal code
    const latLng = await getLatLngFromPostalCode(postalCode);
    const restaurantHeader = new Headers({
        "Content-Type": "application/json",
    });
    const getRestaurantOptions = {
        method: "POST",
        headers: restaurantHeader,
        body: JSON.stringify(latLng),
    };
    const restaurantResponse = await fetch(
        "/restaurants",
        getRestaurantOptions
    );
    let restaurants = await restaurantResponse.json();

    for (let restaurant of restaurants.data) {
        const restaurantId = restaurant.restaurantNumber;
        const getPricesOptions = {
            method: "POST",
            headers: restaurantHeader,
            body: JSON.stringify({ restaurantId }),
        };
        const pricesResponse = await fetch("/prices", getPricesOptions);
        const prices = await pricesResponse.json();
        console.log(prices);
    }
    const getRewardsOptions = {
        method: "GET",
        headers: restaurantHeader,
    };
    const rewardsResponse = await fetch("/rewards", getRewardsOptions);
    const rewards = await rewardsResponse.json();
    console.log(rewards);

    // console.log(data.data[0].restaurantNumber);
}
