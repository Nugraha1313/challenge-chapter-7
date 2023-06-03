const {
  Component,
  ProductComponent,
  Product,
  ComponentSupplier,
  Supplier,
} = require("../models");

module.exports = {
  component: async () => {
    await Component.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
  componentSuppliers: async () => {
    await ComponentSupplier.destroy({
      truncate: true,
      restartIdentity: true,
    });
  },
  productComponents: async () => {
    await ProductComponent.destroy({ truncate: true, restartIdentity: true });
  },
  product: async () => {
    await Product.destroy({
      truncate: true,
      restartIdentity: true,
    });
  },
  suppliers: async () => {
    await Supplier.destroy({
      truncate: true,
      restartIdentity: true,
    });
  },
};
