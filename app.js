require("dotenv").config();
const express = require("express");
const app = express();
// TODO: import the getCityInfo and getJobs functions from util.js
const { getCityInfo, getJobs } = require("./util.js");

// TODO: Statically serve the public folder
const city = "orlando";

// TODO: declare the GET route /api/city/:city
app.get("/api/city/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const cityInfo = await getCityInfo(city);
        const jobs = await getJobs(city);
        const result = `{jobs:${JSON.stringify(jobs)},cityInfo:${JSON.stringify(cityInfo)}}`;
        const test = `${JSON.stringify(cityInfo)}`;
        console.log(result);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status

module.exports = app;
