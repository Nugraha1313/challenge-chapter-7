const express = require("express");
const router = express.Router();

const component = require("../controllers/component");
const product = require("../controllers/product");
const supplier = require("../controllers/supplier");

router.get("/", (req, res) =>
  res.status(200).json({
    message: "Welcome to Manufacture API, there is 3 Endpoint: /components, /products, /suppliers",
  })
);

router.get("/error", (req, res) => {
  // const data = {
  //   status: true,
  //   message: "ga error lagi",
  //   data: null,
  // };

  return res.status(200).json(data);
});

// components
router.get("/components", component.index); //get all
router.get("/components/:component_id", component.show); //get detail
router.post("/components", component.store); //create
router.put("/components/:component_id", component.update); //update
router.delete("/components/:component_id", component.destroy); //delete

// products
router.get("/products", product.index); //get all
router.get("/products/:product_id", product.show); //get detail
router.post("/products", product.store); //create
router.put("/products/:product_id", product.update); //update
router.delete("/products/:product_id", product.destroy); //delete


// suppliers
router.get("/suppliers", supplier.index); //get all
router.get("/suppliers/:supplier_id", supplier.show); //get detail
router.post("/suppliers", supplier.store); //create
router.put("/suppliers/:supplier_id", supplier.update); //update
router.delete("/suppliers/:supplier_id", supplier.destroy); //delete

module.exports = router;
