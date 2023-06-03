const { Component, ProductComponent, Product } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const allProduct = await Product.findAll();
        
      return res.status(200).json({
        status: true,
        message: "Success get all product",
        data: allProduct,
      });
    } catch (err) {
      next(err);
    }
  },
  show: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });

      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Can't find product with id " + product_id,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success get product detail",
        data: product,
      });
    } catch (err) {
      next(err);
    }
  },
  store: async (req, res, next) => {
    try {
      const { name, quantity, component_id } = req.body;
      let errorMessage = "";

      if (!name) {
        errorMessage += "name is required ";
      }

      if (!quantity) {
        errorMessage += "quantity is required ";
      }

      if (!component_id) {
        errorMessage += "component_id is required ";
      }

      if (!name || !quantity || !component_id) {
        return res.status(400).json({
          status: false,
          message: "Data Tidak Lengkap",
          data: null,
        });
      }
      // if (!name || !quantity || !component_id) {
      //   return res.status(404).json({
      //     status: false,
      //     message: errorMessage,
      //     data: null,
      //   });
      // }

      // find component_id
      const components_id = await Component.findAll({
        attributes: ["id"],
      });

      // check if channel_id is exist in channels_id
      const isExist = components_id.find(
        (component) => component.id == component_id
      );
      if (!isExist) {
        return res.status(404).json({
          status: false,
          message: "Can't find component with id " + component_id,
          data: null,
        });
      }

      const addProduct = await Product.create({
        name: name,
        quantity: quantity,
      });

      const addComponent = await ProductComponent.create({
        product_id: addProduct.id,
        component_id: component_id,
      });

      return res.status(201).json({
        status: true,
        message: "Success create new Product",
        data: [addProduct, addComponent],
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { product_id } = req.params;
      const { name, quantity, component_id } = req.body;

      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });

      if (!component_id) {
        const updated = await Product.update(req.body, {
          where: {
            id: product_id,
          },
        });

        if (updated[0] == 0) {
          return res.status(400).json({
            status: false,
            message: "Cant Find product with id " + product_id,
            data: null,
          });
        }

        return res.status(201).json({
          status: true,
          message: "Success update product",
          data: updated,
        });
      }

      // if component_id is filled
      // find component_id
      const components_id = await Component.findAll({
        attributes: ["id"],
      });

      // check if channel_id is exist in channels_id
      const isExist = components_id.find(
        (component) => component.id == component_id
      );
      if (!isExist) {
        return res.status(400).json({
          status: false,
          message: "Can't find component with id " + component_id,
          data: null,
        });
      }

      // update product_components
      const updateProductComponent = await ProductComponent.update(
        {
          product_id: product_id,
          component_id: component_id,
        },
        {
          where: {
            product_id: product_id,
          },
        }
      );

      // update product
      const updateProduct = await Product.update(
        {
          name: name || product.name,
          quantity: quantity || product.quantity,
        },
        {
          where: {
            id: product_id,
          },
        }
      );
      // const updateProduct = await Product.update(req.body, {
      //   where: {
      //     id: product_id,
      //   },
      // });

      if (updateProduct[0] == 0) {
        return res.status(400).json({
          status: false,
          message: "Cant Find product with id " + product_id,
          data: null,
        });
      }

      return res.status(201).json({
        status: true,
        message: "Success update product",
        data: [updateProduct, updateProductComponent],
      });
      // const { product_id } = req.params;
      // const updated = await Product.update(req.body, {
      //   where: {
      //     id: product_id,
      //   },
      // });

      // if (updated[0] == 0) {
      //   return res.status(404).json({
      //     status: false,
      //     message: "Cant Find product with id " + product_id,
      //     data: null,
      //   });
      // }

      // return res.status(201).json({
      //   status: true,
      //   message: "Success update product",
      //   data: updated,
      // });
    } catch (err) {
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { product_id } = req.params;

      // check if product_id is used in product_components
      const isUsed = await ProductComponent.findOne({
        where: {
          product_id: product_id,
        },
      });

      // if (isUsed) {
      //   return res.status(404).json({
      //     status: false,
      //     message: "Can't delete product with id " + product_id + " because it's used in product_components",
      //     data: null,
      //   });
      // }

      const deleted = await Product.destroy({
        where: {
          id: product_id,
        },
      });

      if (!deleted) {
        return res.status(400).json({
          status: false,
          message: "Cant Find product with id " + product_id,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Success delete product with id " + product_id,
        data: deleted,
      });
      // const { product_id } = req.params;
      // const deleted = await Product.destroy({
      //   where: {
      //     id: product_id,
      //   },
      // });

      // if (!deleted) {
      //   return res.status(404).json({
      //     status: false,
      //     message: "Cant Find product with id " + product_id,
      //     data: null,
      //   });
      // }

      // return res.status(200).json({
      //   status: true,
      //   message: "Success delete product",
      //   data: deleted,
      // });
    } catch (err) {
      next(err);
    }
  },
};
