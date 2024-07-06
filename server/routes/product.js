const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/productController");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middlewares/authenticate");
router.route("/products").get(getProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), newProduct);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);
//Reviews
router
  .route("/review")
  .put(isAuthenticatedUser, createReview)
  .delete(isAuthenticatedUser, deleteReview);
router.route("/reviews").get(isAuthenticatedUser, getReviews);

// //Admin routes
// router
//   .route("/admin/product/new")
//   .post(isAuthenticatedUser, authorizedRoles("admin"));

module.exports = router;
