const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      return User.find();
    },

    user: async (parent, { userId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      return User.findOne({ _id: userId });
    },

    getImages: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findById(context.user._id);
      return user.images;
    },

    getAvatar: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const user = await User.findById(context.user._id);
      return user.avatar;
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password, avatar }) => {
      if (!avatar) {
        avatar = ''
      }
      const user = await User.create({ name, email, password, avatar });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, args, context) => {
      if (context && context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addImage: async (parent, { downloadURL }, context) => {
      if (context && context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { images: downloadURL } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addAvatar: async (parent, { downloadURL }, context) => {
      if (context && context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { avatar: downloadURL },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  },
};

module.exports = resolvers;
