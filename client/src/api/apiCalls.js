import { Loader } from "@googlemaps/js-api-loader";
import getRewardMappings from "./mappings";

const fetchHeader = new Headers({
    "Content-Type": "application/json",
});

const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["geocoding"],
});

function loadGeocoder() {
    return new Promise((resolve) => {
        resolve(loader.load());
    });
}

const cache = {};
let geocoder;
let rewards;

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
    const rewardsResponse = await fetch("/rewards");
    const rewards = await rewardsResponse.json();
    return rewards;
}

function optimizeRewards(rewards, listOfRestaurantPrices, restaurants) {
    const optimized = [];
    const rewardMapping = getRewardMappings();

    for (const restaurantPrice of listOfRestaurantPrices) {
        const restaurantOptimized = {};
        const dollarValues = [];
        for (const reward of rewards.rewardStoreOffers) {
            const title = reward.title;
            const points = reward.points;
            if (rewardMapping[title]?.options === false) {
                const category = rewardMapping[title].itemCategory;
                const itemName = rewardMapping[title].itemName;
                const filteredItemByName = restaurantPrice[category].filter(
                    (options) => {
                        return options.itemName === itemName;
                    }
                );
                const price = filteredItemByName[0].unitPrice;
                const value = parseFloat((price / points).toFixed(5));
                dollarValues.push({
                    title,
                    points,
                    price,
                    value,
                });
            } else if (rewardMapping[title]?.options === true) {
                const category = rewardMapping[title].itemCategory;
                const itemType = rewardMapping[title].itemType;
                let filteredItemByType;

                //Edge case as double protein was located in a weird spot
                if (title === "Double Protein") {
                    filteredItemByType = restaurantPrice[
                        category
                    ][0].contents.filter((option) => {
                        return itemType.includes(option.itemType);
                    });
                } else {
                    filteredItemByType = restaurantPrice[category].filter(
                        (option) => {
                            return itemType.includes(option.itemType);
                        }
                    );
                }
                const valuesFromGroup = [];
                let maxPrice = 0;
                let maxItem;
                for (let item of filteredItemByType) {
                    if (item.unitPrice > maxPrice) {
                        maxPrice = item.unitPrice;
                        maxItem = item.itemName;
                    }
                    valuesFromGroup.push({
                        itemName: item.itemName,
                        price: item.unitPrice,
                        value: parseFloat((item.unitPrice / points).toFixed(5)),
                    });
                }
                valuesFromGroup.sort((item1, item2) => {
                    return item2.value - item1.value;
                });
                dollarValues.push({
                    title,
                    points,
                    maxPrice,
                    maxItem,
                    value: parseFloat((maxPrice / points).toFixed(5)),
                    valuesFromGroup,
                });
            } else if (title.includes("Chipotle Goods")) {
                const regex = /\$(\d+(\.\d+)?)/g;
                const price = parseInt(title.match(regex)[0].slice(1));
                const value = parseFloat((price / points).toFixed(5));
                dollarValues.push({
                    title,
                    points,
                    price,
                    value,
                });
            }
        }
        dollarValues.sort((item1, item2) => {
            return item2.value - item1.value;
        });
        restaurantOptimized.restaurant = restaurants.filter((restaurant) => {
            return restaurant.restaurantNumber === restaurantPrice.restaurantId;
        })[0];
        restaurantOptimized.restaurantPrices = restaurantPrice;
        restaurantOptimized.bestValues = dollarValues;
        optimized.push(restaurantOptimized);
    }

    return optimized;
}

export async function getResultsForPostalCode(postalCode) {
    if (cache[postalCode]) {
        return cache[postalCode];
    }
    //use geocoder to get lat and lng for inputed postal code
    const latLng = await getLatLngFromPostalCode(postalCode);

    //fetch the restaurants near the lat and lng coordinates
    const restaurants = await getRestaurants(latLng);

    //fetch the prices from each of the restaurants
    const restaurantPrices = [];
    for (let restaurant of restaurants.data) {
        const priceObj = await getPrices(restaurant.restaurantNumber);
        restaurantPrices.push(priceObj);
    }

    //fetch the rewards from chipotle rewards
    if (!rewards) {
        rewards = await getRewards();
    }

    //for each restaurant, get the best value rewards based on in-store prices.
    const optimizedRewards = optimizeRewards(
        rewards,
        restaurantPrices,
        restaurants.data
    );
    cache[postalCode] = optimizedRewards;
    return optimizedRewards;
}
