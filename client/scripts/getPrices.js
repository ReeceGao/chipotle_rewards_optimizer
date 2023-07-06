const args = process.argv.slice(2);
const restaurantId = args[0];

const prices = `https://services.chipotle.com/menuinnovation/v1/restaurants/${restaurantId}/onlinemenu?channelId=web&includeUnavailableItems=true`;

const getPricesHeader = new Headers({
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "b4d9f36380184a3788857063bce25d6a",
});

const pricesOptions = {
    method: "GET",
    headers: getPricesHeader,
};

fetch(prices, pricesOptions)
    .then((res) => res.json())
    .then((data) => {
        process.stdout.write(JSON.stringify(data));
    });
