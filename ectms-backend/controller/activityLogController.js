const ActivityLog = require("../models/ActivityLog");
const Category = require("../models/Category");
const Product = require("../models/Product");
// import other models if needed, e.g., Sale, User, etc.

const MODULE_MODELS = {
  Category,
  Product,
  // Sale: require("../models/Sale"),
  // User: require("../models/User"),
};

exports.getActivityLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      action,
      module,
      user,
      startDate,
      endDate,
      documentId,
    } = req.query;

    const filter = {};
    if (action) filter.action = action;
    if (module) filter.module = module;
    if (user) filter.user = user;
    if (documentId) filter.documentId = documentId;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    let logs = await ActivityLog.find(filter)
      .populate("user", "username email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Dynamically populate document data based on module
    logs = await Promise.all(
      logs.map(async (log) => {
        const Model = MODULE_MODELS[log.module];
        if (Model && log.documentId) {
          const document = await Model.findById(log.documentId);
          return { ...log.toObject(), document };
        }
        return log.toObject();
      })
    );

    const total = await ActivityLog.countDocuments(filter);

    res.json({
      data: logs,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get activity logs error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getActivityLogs1 = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      action,
      module,
      user,
      startDate,
      endDate,
    } = req.query;

    const filter = {};
    if (action) filter.action = action;
    if (module) filter.module = module;
    if (user) filter.user = user;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const logs = await ActivityLog.find(filter)
      .populate("user", "username email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ActivityLog.countDocuments(filter);

    res.json({
      data: logs,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get activity logs error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteActivityLog = async (req, res) => {
  try {
    const { activityId } = req.params.activityId;
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const log = await ActivityLog.findById(activityId);
    if (!log) return res.status(404).json({ message: "Log not found" });

    await ActivityLog.findByIdAndDelete(activityId);

    res.json({ message: "Activity log deleted successfully" });
  } catch (error) {
    console.error("Delete activity log error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
