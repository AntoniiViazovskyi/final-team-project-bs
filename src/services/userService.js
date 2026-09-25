import UserModel from '../models/User/UserModel.js';

export const getUserById = async (userId) => {
  const user = await UserModel.findById(userId).select('-password');
  return user;
};
