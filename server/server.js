const express = require("express");
const app = express();
app.use(express.json()); //Needed this line otherwise there would be no req.body
const port = 3113;

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.post("/restaurants", (req, res) => {
    const { spawn } = require("child_process");
    const resturants = spawn("node", [
        "./scripts/getRestaurants.js",
        req.body.lat.toString(),
        req.body.lng.toString(),
    ]);
    resturants.stdout.pipe(res);
});

app.post("/prices", (req, res) => {
    const { spawn } = require("child_process");
    const prices = spawn("node", [
        "./scripts/getPrices.js",
        req.body.restaurantId.toString(),
    ]);
    prices.stdout.pipe(res);
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
    // rewards.stdout.on("data", (data) => {
    //     res.send(data.toString());
    // });
    // rewards.stdout.pipe(res);
});

app.listen(port, () => {
    console.log("Server is up on 3113");
});
