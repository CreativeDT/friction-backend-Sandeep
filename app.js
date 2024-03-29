// const bulkAddRoute = require("./routes/bulk_add_routes");

const activityRoutes = require("./routes/activity_routes");
const activityImageRoutes = require("./routes/activity_image_routes");
const activityImageTypeRoutes = require("./routes/activity_image_type_routes");
const activityPartsRoutes = require("./routes/activity_parts_routes");
const activityStatusRoutes = require("./routes/activity_status_routes");
const activityTypeRoutes = require("./routes/activity_type_routes");
const bookmarkRoutes = require("./routes/bookmark_routes");
const chechInRoutes = require("./routes/checkIn_routes");
const dailyLogRoutes = require("./routes/daily_log_routes");
const dailyPunchRoutes = require("./routes/daily_punch_routes");
const helperRoutes = require("./routes/helper_routes");
const historyRoutes = require("./routes/history_routes");
const partsRoutes = require("./routes/parts_routes");
const railLocationRoutes = require("./routes/rail_location_routes");
const serviceTechRoutes = require("./routes/service_tech_routes");
const supplierRoutes = require("./routes/supplier_routes");
const userRoutes = require("./routes/user_routes");
const uploadHistoryRoutes = require("./routes/upload_history_routes");
const uploadTypesRoutes = require("./routes/upload_type_routes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({}));
app.enable("trust proxy");

// app.use(`${process.env.API_URL}/bulk-add`, bulkAddRoute);
app.use(`${process.env.API_URL}/activity`, activityRoutes);
app.use(`${process.env.API_URL}/activity-image`, activityImageRoutes);
app.use(`${process.env.API_URL}/activity-image-type`, activityImageTypeRoutes);
app.use(`${process.env.API_URL}/activity-part`, activityPartsRoutes);
app.use(`${process.env.API_URL}/activity-status`, activityStatusRoutes);
app.use(`${process.env.API_URL}/activity-type`, activityTypeRoutes);
app.use(`${process.env.API_URL}/bookmark`, bookmarkRoutes);
app.use(`${process.env.API_URL}/check-in`, chechInRoutes);
app.use(`${process.env.API_URL}/daily-log`, dailyLogRoutes);
app.use(`${process.env.API_URL}/daily-punch`, dailyPunchRoutes);
app.use(`${process.env.API_URL}/helper`, helperRoutes);
app.use(`${process.env.API_URL}/history`, historyRoutes);
app.use(`${process.env.API_URL}/parts`, partsRoutes);
app.use(`${process.env.API_URL}/rail-location`, railLocationRoutes);
app.use(`${process.env.API_URL}/service-tech`, serviceTechRoutes);
app.use(`${process.env.API_URL}/supplier`, supplierRoutes);
app.use(`${process.env.API_URL}/upload-history`, uploadHistoryRoutes);
app.use(`${process.env.API_URL}/upload-type`, uploadTypesRoutes);
app.use(`${process.env.API_URL}/user`, userRoutes);

module.exports = app;
