const supertest = require("supertest");
const app = require("../app.js");
const truncate = require("../utils/truncate.js");
const seeder = require("../utils/seeder.js");

truncate.component();
truncate.product();
truncate.suppliers();
truncate.productComponents();
truncate.componentSuppliers();

seeder.component();
seeder.product();
seeder.suppliers();
seeder.productComponents();
seeder.componentSuppliers();

const component = {
  name: "Kayu",
  description: "Merupakan Material Gergaji",
};
const component_id = 1;
const invalid_component_id = 99;
const product_id = 1;
const invalid_product_id = 99;
const supplier_id = 1;
const invalid_supplier_id = 99;

const product = {
  name: "Meja Kayu",
  quantity: 100,
  component_id: 1,
};

const invalidProduct = {
  name: "Meja Besi",
  quantity: 100,
  component_id: invalid_component_id,
};

const supplier = {
  name: "PT. Supplier Kayu",
  address: "Jalan Sematang Borang, No. 12",
  component_id: 1,
};

const supplier2 = {
  name: "PT. Supplier Besi",
  address: "Jalan Ngawi, No. 50",
};

const invalidSupplier = {
  name: "PT. Supplier Kayu",
  address: "Jalan Sematang Borang, No. 12",
  component_id: invalid_component_id,
};

// getAll
describe("Test /components endpoint", () => {
  // postiive
  test("Positive: get all data", async () => {
    try {
      const res = await supertest(app).get("/components");

      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", true);
      expect(res.body).toHaveProperty("message", "Success get all Component");
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative
});

// getSingle
describe("Test /components/:component_id endpoint", () => {
  // postiive
  test("Positive: component_id is valid", async () => {
    try {
      const res = await supertest(app).get(`/components/${component_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("description");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success get Component detail");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative
  test("Negative: component_id is not valid", async () => {
    try {
      const res = await supertest(app).get(
        `/components/${invalid_component_id}`
      );

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Can't find Component with id ${invalid_component_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// create
describe("Test /components endpoint", () => {
  // Positive
  test("Positive: valid data", async () => {
    try {
      const res = await supertest(app).post("/components").send(component);

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("description");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success create new Component");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative
  test("Negative: data tidak lengkap", async () => {
    try {
      const res = await supertest(app).post("/components").send({
        description: "Merupakan Material Gergaji",
      });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("name is required");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// update
describe("Test /components/:component_id endpoint", () => {
  // Positive
  test("Positive: valid component id", async () => {
    try {
      const res = await supertest(app).put(`/components/${component_id}`).send({
        description:
          "Merupakan Material Gergaji yang berkualitas sangat tinggi",
      });

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success update Component");
      expect(res.body.data).toStrictEqual([1]);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative
  test("Negative: invalid component id", async () => {
    try {
      const res = await supertest(app)
        .put(`/components/${invalid_component_id}`)
        .send({
          name: "Kayu Jati",
          description:
            "Merupakan Material Gergaji yang berkualitas sangat tinggi",
        });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find Component with id ${invalid_component_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// delete
describe("Test /components/:component_id endpoint", () => {
  // Positive
  //   test("Positive: valid component id", async () => {
  //     try {
  //       const res = await supertest(app).delete(`/components/2`);

  //       console.log(res.body);

  //       expect(res.statusCode).toBe(200);
  //       expect(res.body).toHaveProperty("status");
  //       expect(res.body).toHaveProperty("message");
  //       expect(res.body).toHaveProperty("data");
  //       expect(res.body.status).toBe(true);
  //       expect(res.body.message).toBe(
  //         `Success delete Component with id 2`
  //       );
  //       expect(res.body.data).toStrictEqual(1);
  //     } catch (error) {
  //       expect(error).toBe("error");
  //     }
  //   });
  // negative 1
  test("Negative: component is used", async () => {
    try {
      const res = await supertest(app).delete(`/components/${component_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Component is used in Product");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 2
  test("Negative: invalid component id", async () => {
    try {
      const res = await supertest(app).delete(
        `/components/${invalid_component_id}`
      );

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find Component with id ${invalid_component_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// PRODUCT
// getAll
describe("[GET] /products endpoint", () => {
  // postiive
  test("Positive: get all data", async () => {
    try {
      const res = await supertest(app).get("/products");

      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", true);
      expect(res.body).toHaveProperty("message", "Success get all product");
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative
});

// getSingle
describe("[GET] /products/:product_id endpoint", () => {
  // postiive
  test("Positive: product_id is valid", async () => {
    try {
      const res = await supertest(app).get(`/products/${product_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("quantity");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success get product detail");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative
  test("Negative: product_id is not valid", async () => {
    try {
      const res = await supertest(app).get(`/products/${invalid_product_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Can't find product with id ${invalid_product_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// create
describe("[POST] /products endpoint", () => {
  // Positive
  test("Positive: valid data", async () => {
    try {
      const res = await supertest(app).post("/products").send(product);

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("quantity");
      expect(res.body.data[1]).toHaveProperty("component_id");
      expect(res.body.data[1]).toHaveProperty("product_id");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success create new Product");
      expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 1
  test("Negative: data tidak lengkap", async () => {
    try {
      const res = await supertest(app).post("/products").send({
        name: "Meja Kerja",
      });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Data Tidak Lengkap");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative 2
  test("Negative: component_id invalid", async () => {
    try {
      const res = await supertest(app).post("/products").send(invalidProduct);

      console.log(res.body);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Can't find component with id ${invalidProduct.component_id}`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// update
describe("[PUT] /products/:product_id endpoint", () => {
  //   Positive
  test("Positive: valid product_id", async () => {
    try {
      const res = await supertest(app).put(`/products/${product_id}`).send({
        quantity: 225,
      });

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success update product");
      expect(res.body.data).toStrictEqual([1]);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 1
  test("Negative: invalid product id", async () => {
    try {
      const res = await supertest(app)
        .put(`/products/${invalid_product_id}`)
        .send({
          quantity: 225,
        });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find product with id ${invalid_product_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 2
  test("Negative: invalid component_id", async () => {
    try {
      const res = await supertest(app).put(`/products/${product_id}`).send({
        component_id: invalid_component_id,
      });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Can't find component with id ${invalid_component_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// delete
describe("[DELETE] /products/:product_id endpoint", () => {
  // Positive
  // test("Positive: valid product id", async () => {
  //   try {
  //     const res = await supertest(app).delete(`/products/2`);

  //     console.log(res.body);

  //     expect(res.statusCode).toBe(200);
  //     expect(res.body).toHaveProperty("status");
  //     expect(res.body).toHaveProperty("message");
  //     expect(res.body).toHaveProperty("data");
  //     expect(res.body.status).toBe(true);
  //     expect(res.body.message).toBe(
  //       `Success delete product with id 2`
  //     );
  //     expect(res.body.data).toStrictEqual(1);
  //   } catch (error) {
  //     expect(error).toBe("error");
  //   }
  // });
  // negative 2
  test("Negative: invalid product_id", async () => {
    try {
      const res = await supertest(app).delete(
        `/products/${invalid_product_id}`
      );

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find product with id ${invalid_product_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// getAll
describe("[GET] /suppliers endpoint", () => {
  // postiive
  test("Positive: get all data", async () => {
    try {
      const res = await supertest(app).get("/suppliers");

      console.log(res.body);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", true);
      expect(res.body).toHaveProperty("message", "Success get all Supplier");
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative
});

// getSingle
describe("[GET] /suppliers/:supplier_id endpoint", () => {
  // postiive
  test("Positive: supplier_id is valid", async () => {
    try {
      const res = await supertest(app).get(`/suppliers/${supplier_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("address");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success get Supplier detail");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative
  test("Negative: supplier_id is not valid", async () => {
    try {
      const res = await supertest(app).get(`/suppliers/${invalid_supplier_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Can't find Supplier with id ${invalid_supplier_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// create
describe("[POST] /suppliers endpoint", () => {
  // Positive 1
  test("Positive: valid data, provice component_id", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send(supplier);

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data[0]).toHaveProperty("id");
      expect(res.body.data[0]).toHaveProperty("name");
      expect(res.body.data[0]).toHaveProperty("address");
      expect(res.body.data[1]).toHaveProperty("component_id");
      expect(res.body.data[1]).toHaveProperty("supplier_id");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success create new Supplier");
      expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // Positive 2
  test("Positive: valid data, tanpa provide component_id", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send(supplier2);

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("name");
      expect(res.body.data).toHaveProperty("address");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success create new Supplier");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 1
  test("Negative: data tidak lengkap", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send({
        address: "Jalan Borang",
        component_id: 1,
      });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("name is required");
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative 2
  test("Negative: component_id invalid", async () => {
    try {
      const res = await supertest(app).post("/suppliers").send(invalidSupplier);

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Can't find component with id ${invalidSupplier.component_id}`
      );
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// update
describe("[PUT] /suppliers/:supplier_id endpoint", () => {
  //   Positive
  test("Positive: update include component_id", async () => {
    try {
      const res = await supertest(app).put(`/suppliers/${supplier_id}`).send({
        address: "Jalan Wahyudi No 125",
        component_id: 1,
      });

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success update Supplier");
      //   expect(res.body.data).toStrictEqual([1]);
      expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  test("Positive: update without component_id", async () => {
    try {
      const res = await supertest(app).put(`/suppliers/${supplier_id}`).send({
        address: "Jalan Wahyudi No 125",
      });

      console.log(res.body);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe(
        `Success update Supplier with id ${supplier_id}`
      );
      expect(res.body.data).toStrictEqual([1]);
      //   expect(Array.isArray(res.body.data)).toBe(true);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 1
  test("Negative: invalid supplier id, without update component_id", async () => {
    try {
      const res = await supertest(app)
        .put(`/suppliers/${invalid_supplier_id}`)
        .send({
          address: "Jalan Melody No 48",
        });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find Supplier with id ${invalid_supplier_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative 2
  test("Negative: invalid supplier id, update component_id", async () => {
    try {
      const res = await supertest(app)
        .put(`/suppliers/${invalid_supplier_id}`)
        .send({
          address: "Jalan Melody No 48",
          component_id: 1,
        });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find Supplier with id ${invalid_supplier_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  //   negative 3
  test("Negative: invalid supplier_id", async () => {
    try {
      const res = await supertest(app)
        .put(`/suppliers/${invalid_supplier_id}`)
        .send({
          address: "Jalan Melody No 48",
          component_id: 1,
        });

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find Supplier with id ${invalid_supplier_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});

// delete
describe("[DELETE] /suppliers/:supplier_id endpoint", () => {
  // Positive
  //   test("Positive: valid supplier id", async () => {
  //     try {
  //       //   const res = await supertest(app).delete(`/suppliers/${supplier_id}`);
  //       const res = await supertest(app).delete(`/suppliers/2`);

  //       console.log(res.body);

  //       expect(res.statusCode).toBe(200);
  //       expect(res.body).toHaveProperty("status");
  //       expect(res.body).toHaveProperty("message");
  //       expect(res.body).toHaveProperty("data");
  //       expect(res.body.status).toBe(true);
  //       expect(res.body.message).toBe(`Success delete Supplier with id 2`);
  //       expect(res.body.data).toStrictEqual(1);
  //     } catch (error) {
  //       expect(error).toBe("error");
  //     }
  //   });
  // negative 1
  test("Negative: invalid supplier_id", async () => {
    try {
      const res = await supertest(app).delete(
        `/suppliers/${invalid_supplier_id}`
      );

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        `Cant Find Supplier with id ${invalid_supplier_id}`
      );
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
  // negative 2
  test("Negative: supplier is used in components", async () => {
    try {
      const res = await supertest(app).delete(`/suppliers/${supplier_id}`);

      console.log(res.body);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`Supplier with id ${supplier_id} is used`);
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe("error");
    }
  });
});
