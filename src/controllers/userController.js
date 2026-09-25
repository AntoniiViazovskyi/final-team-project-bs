import { getUserById, getPublicUserById } from '../services/userService.js';

export const getUserProfile = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: 'User not found' });
  }

  res.status(200).json({ status: 200, data: user });
};

export const getPublicUserProfile = async (req, res) => {
  const { userId } = req.params;
  const user = await getPublicUserById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: 'User not found' });
  }

  res.status(200).json({ status: 200, data: user });
};
