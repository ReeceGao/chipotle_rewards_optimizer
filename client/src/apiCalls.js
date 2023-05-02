import { Loader } from "@googlemaps/js-api-loader";

const fetchHeader = new Headers({
    "Content-Type": "application/json",
});

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

async function getRestaurants(latLng) {
    const getRestaurantOptions = {
        method: "POST",
        headers: fetchHeader,
        body: JSON.stringify(latLng),
    };
    const restaurantResponse = await fetch(
        "/restaurants",
        getRestaurantOptions
    );
    const restaurants = await restaurantResponse.json();
    return restaurants;
}

async function getPrices(restaurantId) {
    const getPricesOptions = {
        method: "POST",
        headers: fetchHeader,
        body: JSON.stringify({ restaurantId }),
    };
    const pricesResponse = await fetch("/prices", getPricesOptions);
    const prices = await pricesResponse.json();
    return prices;
}

async function getRewards() {
    const getRewardsOptions = {
        method: "GET",
        headers: fetchHeader,
    };
    const rewardsResponse = await fetch("/rewards", getRewardsOptions);
    const rewards = await rewardsResponse.json();
    return rewards;
}

export async function getResultsForPostalCode(postalCode) {
    //use geocoder to get lat and lng for inputed postal code
    const latLng = await getLatLngFromPostalCode(postalCode);

    //fetch the restaurants near the lat and lng coordinates
    const restaurants = await getRestaurants(latLng);

    //fetch the prices from each of the restaurants
    const prices = [];
    for (let restaurant of restaurants.data) {
        const priceObj = await getPrices(restaurant.restaurantNumber);
        prices.push(priceObj);
    }

    //fetch the rewards from chipotle rewards
    const rewards = await getRewards();

    console.log(prices);
    console.log(rewards);
}
