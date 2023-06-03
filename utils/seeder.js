const {
  Component,
  ProductComponent,
  Product,
  ComponentSupplier,
  Supplier,
} = require("../models");

module.exports = {
  component: async () => {
    await Component.bulkCreate([
      {
        name: "Kayu",
        description: "Merupakan Kayu",
      },
      {
        name: "Besi",
        description: "Merupakan Besi",
      },
      {
        name: "Tembaga",
        description: "Merupakan Tembaga",
      },
      {
        name: "Seng",
        description: "Merupakan Seng",
      },
      {
        name: "Fiber",
        description: "Merupakan Fiber",
      },
    ]);
  },
  product: async () => {
    await Product.bulkCreate([
      {
        name: "Meja Kayu",
        quantity: 100,
      },
      {
        name: "Lemari Besi",
        quantity: 20,
      },
      {
        name: "Meja Tembaga",
        quantity: 10,
      },
      {
        name: "Meja Seng",
        quantity: 25,
      },
      {
        name: "Meja Fiber",
        quantity: 50,
      },
    ]);
  },
  suppliers: async () => {
    await Supplier.bulkCreate([
      {
        name: "PT. Budi Kayu",
        address: "Jl. Kayu No. 1",
      },
      {
        name: "PT. Freya Besi",
        address: "JL. Besi No. 2",
      },
      {
        name: "PT. Tembaga Makmur Jaya",
        address: "Jl. Tembaga No. 3",
      },
      {
        name: "PT. Seng Sengaja",
        address: "JL. Rahmat wahyudi no. 4",
      },
      {
        name: "PT. Fiber Sentosa",
        address: "JL. Fiber no. 5",
      },
    ]);
  },
  productComponents: async () => {
    await ProductComponent.bulkCreate([
      {
        product_id: 1,
        component_id: 1,
      },
      {
        product_id: 2,
        component_id: 2,
      },
      {
        product_id: 3,
        component_id: 3,
      },
      {
        product_id: 4,
        component_id: 4,
      },
      {
        product_id: 5,
        component_id: 5,
      },
    ]);
  },
  componentSuppliers: async () => {
    await ComponentSupplier.bulkCreate([
      {
        component_id: 1,
        supplier_id: 1,
      },
      {
        component_id: 2,
        supplier_id: 2,
      },
      {
        component_id: 3,
        supplier_id: 3,
      },
      {
        component_id: 4,
        supplier_id: 4,
      },
      {
        component_id: 5,
        supplier_id: 5,
      },
    ]);
  },
};
