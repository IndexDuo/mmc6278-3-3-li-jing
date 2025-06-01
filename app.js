require("dotenv").config();
const express = require("express");
const app = express();
// TODO: import the getCityInfo and getJobs functions from util.js
const { getCityInfo, getJobs } = require("./util.js");

// TODO: Statically serve the public folder
app.use(express.static("public"));
// TODO: declare the GET route /api/city/:city
app.get("/api/city/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const cityInfo = await getCityInfo(city);
        const jobs = await getJobs(city);

        //   Jobs found but no city info found
        //     1) should return 200 status and "jobs" and "cityInfo" properties in JSON response object
        //     2) should return 200 status and job results as under "jobs" property in JSON response object
        //     3) should return 200 status and false for "cityInfo" property in JSON response object
        //   City info found but no jobs found
        //     4) should return 200 status and "jobs" and "cityInfo" properties in JSON response object
        //     5) should return 200 status and false for "jobs" property in JSON response object
        //     6) should return 200 status and city info in "cityInfo" property in JSON response object
        var result;
        if (!cityInfo && jobs) {
            result = {
                jobs: jobs,
                cityInfo: false,
            };
            res.status(200).json(result);
        } else if (cityInfo && !jobs) {
            result = {
                jobs: false,
                cityInfo: cityInfo,
            };
            res.status(200).json(result);
        } else if (cityInfo && jobs) {
            result = {
                jobs: jobs,
                cityInfo: cityInfo,
            };
            // console.log(result);
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "no city info or jobs are found" });
        }
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
