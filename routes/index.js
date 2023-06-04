const express = require("express");
const router = express.Router();

const component = require("../controllers/component");
const product = require("../controllers/product");
const supplier = require("../controllers/supplier");

const auth = require("../controllers/auth");
const user = require("../controllers/user");

const authMiddleware = require("../middleware/auth");
const multer = require("multer")();
// router.get("/", (req, res) =>
//   res.status(200).json({
//     // message: "Welcome to Manufacture API, there is 3 Endpoint: /components, /products, /suppliers",
//     message: `Welcome to Manufacture API, there is Endpoints: x`,
//   })
// );

router.get("/error", (req, res) => {
  // const data = {
  //   status: true,
  //   message: "ga error lagi",
  //   data: null,
  // };

  return res.status(200).json(data);
});

// auth
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/oauth", auth.loginGoogle);

router.get("/activation-email", auth.verifyEmail);

// user
router.get("/profile", authMiddleware.auth, user.getUser);
router.put("/update-profile", authMiddleware.auth, user.update);
router.post("/upload-avatar", authMiddleware.auth, multer.single('avatar'), user.uploadAvatar);

// components
router.get("/components", authMiddleware.auth, component.index); //get all
router.get("/components/:component_id", authMiddleware.auth, component.show); //get detail
router.post(
  "/components",
  authMiddleware.auth,
  authMiddleware.is_admin,
  component.store
); //create
router.put(
  "/components/:component_id",
  authMiddleware.auth,
  authMiddleware.is_admin,
  component.update
); //update
router.delete(
  "/components/:component_id",
  authMiddleware.auth,
  authMiddleware.is_admin,
  component.destroy
); //delete

// products
router.get("/products", authMiddleware.auth, product.index); //get all
router.get("/products/:product_id", authMiddleware.auth, product.show); //get detail
router.post(
  "/products",
  authMiddleware.auth,
  authMiddleware.is_admin,
  product.store
); //create
router.put(
  "/products/:product_id",
  authMiddleware.auth,
  authMiddleware.is_admin,
  product.update
); //update
router.delete(
  "/products/:product_id",
  authMiddleware.auth,
  authMiddleware.is_admin,
  product.destroy
); //delete

// suppliers
router.get("/suppliers", authMiddleware.auth, supplier.index); //get all
router.get("/suppliers/:supplier_id", authMiddleware.auth, supplier.show); //get detail
router.post(
  "/suppliers",
  authMiddleware.auth,
  authMiddleware.is_admin,
  supplier.store
); //create
router.put(
  "/suppliers/:supplier_id",
  authMiddleware.auth,
  authMiddleware.is_admin,
  supplier.update
); //update
router.delete(
  "/suppliers/:supplier_id",
  authMiddleware.auth,
  authMiddleware.is_admin,
  supplier.destroy
); //delete

module.exports = router;
