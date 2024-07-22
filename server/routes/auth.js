const express = require("express");
const multer = require("multer");
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null);
      // cb(null, path.join(__dirname, "..", "uploads/users"));
    },
    // filename: function (req, file, cb) {
    //   cb(null, file.originalname);
    // },
  }),
});
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middlewares/authenticate");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const router = express.Router();
router.route("/register").post(upload.single(), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
// router.route("/update").put(isAuthenticatedUser, updateProfile);

// //Admin routes
// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizedRoles("admin"), getUser)
//   .put(isAuthenticatedUser, authorizedRoles("admin"), updateUser)
//   .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);
module.exports = router;
