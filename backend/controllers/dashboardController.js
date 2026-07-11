const asyncHandler = require("../middleware/asyncHandler");

const {
    getDashboardData,
} = require("../services/dashboardService");

const getDashboard = asyncHandler(async (req, res) => {
    const dashboard = await getDashboardData();

    res.status(200).json(dashboard);
});

module.exports = {
    getDashboard,
};