exports.handler = async function (event, context) {
    const rewardsURL =
        "https://services.chipotle.com/rewardstore/v1/rewardstore/web";

    const rewardsHeader = new Headers({
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "b4d9f36380184a3788857063bce25d6a",
        Authorization:
            "Bearer eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.DJA8aPuoevEbNdBr3alC719HEjkJ6AEYr3SaaajzcJsV7pdDRTpROg.pf61J7-XwBtKzkWCQ5Jc2w.MZrhiYbw_j1n1AFEksKow_2LKa-5aDH-902Tf1KjOHP_tWZB-P27ezBeMb6gkTsC685-D7nDrTEsh5LaxhV0suvekqNCpfOsMmUGOY2vLgj7e7WYyG8-pNZKbH8oNz2zSrXj-qForFUNGqIBbJbuD9DP4rcaqr3-9bP2NHLj9B0Gyqf0eR7mqHUH8An96AhufC_iKtO_8-9L7EZ8luwkxAMowMDEU94jz50-mPM0MKK8mgk9afJhYz7JLNVeJw7XDng2iejY_-WuJgmZI6cuDTLwU7DEHcqrePttWcHKUJGzM3KhigpNruckwaZ-nJWRSq6PKI8XJW1RvjT-KuW3dvucXDhRoYFuL0n_OKcoR7C87KNi-_MWis_2-sj2NUh8eusTREDKVaM804r_N7OgaS6ppjtauWg-XuQ4W4zdi8Qj2xu0N8inJ0E7s5Q8pvjxIjkdL_cTFK6ryFbZVM6t5F5jnDkOZmbLMmvbgjn7P8lVxf2jIepjAtIK1rSlKZCh.mmztN6B3p5tG6ZDwk1yVlQ",
    });
    const rewardsOptions = {
        method: "GET",
        headers: rewardsHeader,
    };
    const test = await fetch(rewardsURL, rewardsOptions);
    const test1 = await test.json();
    return {
        statusCode: 200,
        body: JSON.stringify(test1),
    };
};
