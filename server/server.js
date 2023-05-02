const express = require("express");
const app = express();
app.use(express.json()); //Needed this line otherwise there would be no req.body
const port = 3113;

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

app.get("/rewards", (req, res) => {
    const { spawn } = require("child_process");
    const rewards = spawn("node", ["./scripts/getRewards.js"]);
    rewards.stdout.pipe(res);
});

app.listen(port, () => {
    console.log("Server is up on 3113");
});
