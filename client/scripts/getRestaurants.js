const args = process.argv.slice(2);

const restaurants = "https://services.chipotle.com/restaurant/v3/restaurant";

const getRestaurantHeaders = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "b4d9f36380184a3788857063bce25d6a",
});

const payload = {
    latitude: parseFloat(args[0]),
    longitude: parseFloat(args[1]),
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

fetch(restaurants, resOptions)
    .then((res) => res.json())
    .then((data) => {
        process.stdout.write(JSON.stringify(data));
    });
