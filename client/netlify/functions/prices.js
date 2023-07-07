exports.handler = async function (event, context) {
    const restaurantId = JSON.parse(event.body).restaurantId;
    const pricesUrl = `https://services.chipotle.com/menuinnovation/v1/restaurants/${restaurantId}/onlinemenu?channelId=web&includeUnavailableItems=true`;

    const getPricesHeader = new Headers({
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "b4d9f36380184a3788857063bce25d6a",
    });

    const pricesOptions = {
        method: "GET",
        headers: getPricesHeader,
    };

    const response = await fetch(pricesUrl, pricesOptions);
    const prices = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(prices),
    };
};
