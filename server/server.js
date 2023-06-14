const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json()); //Needed this line otherwise there would be no req.body
app.use(
    cors({
        origin: "*",
    })
);
const port = 3113;

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.post("/restaurants", async (req, res) => {
    const { spawn } = require("child_process");
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

app.post("/prices", async (req, res) => {
    const { spawn } = require("child_process");
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

app.get("/rewards", async (req, res) => {
    const { spawn } = require("child_process");
    const rewards = spawn("node", ["./scripts/getRewards.js"]);
    let data = "";
    for await (const chunk of rewards.stdout) {
        data += chunk;
    }
    let error = "";
    for await (const chunk of rewards.stderr) {
        error += chunk;
    }
    const exitCode = await new Promise((resolve, reject) => {
        rewards.on("close", resolve);
    });
    if (exitCode) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }
    res.send(JSON.parse(data));
});

app.listen(port, () => {
    console.log("Server is up and running!");
});
