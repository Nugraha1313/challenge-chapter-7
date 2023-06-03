// const { components, product_components } = require('')

// const { components } = require("../models/components");
const { Component, ProductComponent } = require("../models");

module.exports = {
  index: async (req, res, next) => {
    try {
      const allComponent = await Component.findAll();

      return res.status(200).json({
        status: true,
        message: "Success get all Component",
        data: allComponent,
      });
    } catch (err) {
      next(err);
    }
  },
    show: async (req, res, next) => {
      try {
        const { component_id } = req.params;
        const selectedComponent = await Component.findOne({
          where: {
            id: component_id,
          },
        });

        if (!selectedComponent) {
          return res.status(400).json({
            status: false,
            message: "Can't find Component with id " + component_id,
            data: null,
          });
        }

        return res.status(200).json({
          status: true,
          message: "Success get Component detail",
          data: selectedComponent,
        });
      } catch (err) {
        next(err);
      }
    },
    store: async (req, res, next) => {
      try {
        const { name, description } = req.body;

        if (!name) {
          return res.status(400).json({
            status: false,
            message: "name is required",
            data: null,
          });
        }
        let newComponent;

        if (!description) {
          newComponent = await Component.create({
            name: name,
          });
        } else {
          newComponent = await Component.create({
            name: name,
            description: description,
          });
        }

        return res.status(201).json({
          status: true,
          message: "Success create new Component",
          data: newComponent,
        });
        // const { name, description } = req.body;

        // if (!name) {
        //   return res.status(400).json({
        //     status: false,
        //     message: "name is required",
        //     data: null,
        //   });
        // }
        // let newComponent;

        // if(!description) {
        //     newComponent = await Component.create({
        //       name: name
        //     });
        // }else {
        //     newComponent = await Component.create({
        //       name: name,
        //       description: description,
        //     });
        // }

        // return res.status(201).json({
        //   status: true,
        //   message: "Success create new Component",
        //   data: newComponent,
        // });
      } catch (err) {
        next(err);
      }
    },
    update: async (req, res, next) => {
      try {
        const { component_id } = req.params;
        const component = await Component.findOne({
          where: {
            id: component_id,
          },
        });

        const updated = await Component.update(
          {
            name: req.body.name || component.name,
            description: req.body.description || component.description,
          },
          {
            where: {
              id: component_id,
            },
          }
        );

        if (updated[0] == 0) {
          return res.status(400).json({
            status: false,
            message: "Cant Find Component with id " + component_id,
            data: null,
          });
        }

        return res.status(201).json({
          status: true,
          message: "Success update Component",
          data: updated,
        });
      } catch (err) {
        next(err);
      }
    },
    destroy: async (req, res, next) => {
      try {
        const { component_id } = req.params;
        const isComponentUsed = await ProductComponent.findOne({
          where: {
            component_id: component_id,
          },
        });

        if (isComponentUsed) {
          return res.status(400).json({
            status: false,
            message: "Component is used in Product",
            data: null,
          });
        }

        const deleted = await Component.destroy({
          where: {
            id: component_id,
          },
        });

        if (!deleted) {
          return res.status(400).json({
            status: false,
            message: "Cant Find Component with id " + component_id,
            data: null,
          });
        }

        return res.status(200).json({
          status: true,
          message: "Success delete Component with id " + component_id,
          data: deleted,
        });
      } catch (err) {
        next(err);
      }
    },
};
