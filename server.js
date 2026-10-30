const express = require("express");

const app = express();

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to WorkSphere API");
});

// Get tasks with pagination
app.get("/api/tasks", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Validate page
    if (!Number.isInteger(page) || page <= 0) {
      return res.status(400).json({
        success: false,
        message: "Page must be a positive integer",
      });
    }

    // Validate limit
    if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: "Limit must be between 1 and 100",
      });
    }

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    res.status(200).json({
      success: true,
      pagination: {
        page,
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong on the server.",
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log("WorkSphere server running on port 3000");
});
