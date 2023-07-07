exports.handler = async function (event, context) {
    const restaurantsUrl =
        "https://services.chipotle.com/restaurant/v3/restaurant";

    const getRestaurantHeaders = new Headers({
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "b4d9f36380184a3788857063bce25d6a",
    });
    console.log(event.body);
    console.log(typeof event.body);
    const payload = {
        latitude: parseFloat(event.body.latLng.lat),
        longitude: parseFloat(event.body.latLng.lng),
        radius: 80467,
        restaurantStatuses: ["OPEN", "LAB"],
        conceptIds: ["CMG"],
        orderBy: "distance",
        orderByDescending: false,
        pageSize: 10,
        pageIndex: 0,
        embeds: {
            addressTypes: ["MAIN"],
            realHours: true,
            directions: true,
            catering: true,
            onlineOrdering: true,
            timezone: true,
            marketing: true,
            chipotlane: true,
            sustainability: true,
            experience: true,
        },
    };

    const resOptions = {
        method: "POST",
        headers: getRestaurantHeaders,
        body: JSON.stringify(payload),
    };

    const response = await fetch(restaurantsUrl, resOptions);
    const restaurants = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(restaurants),
    };
};
