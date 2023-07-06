import express, { Router } from "express";
import cors from "cors";
import serverless from "serverless-http";
// import fetch from "node-fetch";

const app = express();
const router = Router();
app.use(express.json()); //Needed this line otherwise there would be no req.body
app.use(
    cors({
        origin: "*",
    })
);
// const port = 3113;

router.get("/", (req, res) => {
    res.send("hello world!");
});

router.post("/restaurants", async (req, res) => {
    const { spawn } = await import("child_process");
    const restaurants = spawn("node", [
        "./scripts/getRestaurants.js",
        req.body.lat.toString(),
        req.body.lng.toString(),
    ]);
    let data = "";
    for await (const chunk of restaurants.stdout) {
        data += chunk;
    }
    let error = "";
    for await (const chunk of restaurants.stderr) {
        error += chunk;
    }
    const exitCode = await new Promise((resolve, reject) => {
        restaurants.on("close", resolve);
    });
    if (exitCode) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }
    res.send(JSON.parse(data));
});

router.post("/prices", async (req, res) => {
    const { spawn } = await import("child_process");
    const prices = spawn("node", [
        "./scripts/getPrices.js",
        req.body.restaurantId.toString(),
    ]);
    let data = "";
    for await (const chunk of prices.stdout) {
        data += chunk;
    }
    let error = "";
    for await (const chunk of prices.stderr) {
        error += chunk;
    }
    const exitCode = await new Promise((resolve, reject) => {
        prices.on("close", resolve);
    });
    if (exitCode) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }
    res.send(JSON.parse(data));
});

router.get("/rewards", async (req, res) => {
    // const { spawn } = await import("child_process");
    // const rewards = spawn("node", ["./scripts/getRewards.js"]);
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
    const data = test.json();
    // let data = "";
    // for await (const chunk of rewards.stdout) {
    //     data += chunk;
    // }
    // let error = "";
    // for await (const chunk of rewards.stderr) {
    //     error += chunk;
    // }
    // const exitCode = await new Promise((resolve, reject) => {
    //     rewards.on("close", resolve);
    // });
    // if (exitCode) {
    //     throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    // }
    res.send(JSON.parse(data));
});

// app.listen(port, () => {
//     console.log("Server is up and running!");
// });
app.use("/.netlify/functions/api", router);
// app.use("/api/", router);

export const handler = serverless(app);
