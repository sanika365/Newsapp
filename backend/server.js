const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route to fetch news data
app.get("/api/news", async (req, res) => {
  try {
    const pageSize = 5;
    const apiKey = process.env.NEWS_API_KEY;
    const { country, category } = req.query;

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country,
        category,
        pageSize,
      },
      headers: {
        "x-Api-Key": apiKey, // Include the API key in the request headers
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

