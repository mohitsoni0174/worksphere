const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin)

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    //Add the number of tasks for each user
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasksCount = await Task.countDocuments({
          assignedTo: user._id,
          status: "pending",
        });
        const inProgressTasksCount = await Task.countDocuments({
          assignedTo: user._id,
          status: "in-progress",
        });
        const completedTasksCount = await Task.countDocuments({
          assignedTo: user._id,
          status: "completed",
        });
        return {
          ...user._doc, //INCLUDE ALL USER DATA
          pendingTasksCount,
          inProgressTasksCount,
          completedTasksCount,
        };
      }),
    );
    res.status(200).json(usersWithTaskCount);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private (Admin)

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete a user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin)

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete user's associated tasks
    await Task.deleteMany({ user: user._id });

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      message: "User and associated tasks deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
};
