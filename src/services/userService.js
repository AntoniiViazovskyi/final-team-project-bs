import { User } from '../models/user.js';

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

export const updateUser = async (userId, updateData) => {
  const updateUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select('-password');

  return updateUser;
};
