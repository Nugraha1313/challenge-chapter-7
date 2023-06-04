const { User } = require("../models");
const imagekit = require("../utils/imageKit");

module.exports = {
  getUser: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findOne({ where: { id } });
      return res.status(200).json({
        status: true,
        message: "Success get user data",
        // data: {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        //   avatar: user.avatar
        // },
        data: user,
      });
    } catch (err) {
      throw err;
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.user;
      const { name, email, password, confirm_password } = req.body;
      const user = await User.findOne({ where: { id } });
      // check password confirm_password
      if (password != confirm_password) {
        return res.status(400).json({
          status: false,
          message: "Password Doesn't Match",
        });
      }
      if (email) {
        //   check if email given is already exist using by other user
        findEmail = await User.findOne({ where: { email } });

        // if email exist and the id is not the same with the user id
        if (findEmail && findEmail.id != id) {
          return res.status(400).json({
            status: false,
            message: "Email is already used!",
          });
        }
      }

      const updatedUser = await User.update(
        {
          name: name || user.name,
          email: email || user.email,
          password: password || user.password,
        },
        { where: { id } }
      );
      if (updatedUser[0] == 0) {
        return res.status(400).json({
          status: false,
          message: "Update profile failed!",
          data: null,
        });
      }
      return res.status(201).json({
        status: true,
        message: "Success update profile",
        data: null,
      });
    } catch (err) {
      throw err;
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found!",
          data: null,
        });
      }

      const stringFile = req.file.buffer.toString("base64");

      const uploadFile = await imagekit.upload({
        fileName: req.file.originalname,
        file: stringFile,
      });

      user.avatar = uploadFile.url;
      await user.save();

      return res.json({
        status: true,
        message: "Avatar uploaded successfully",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};
