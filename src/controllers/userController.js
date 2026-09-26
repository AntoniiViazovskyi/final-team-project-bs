import { getUserById, updateUser } from '../services/userService.js';

export const getUserProfile = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserById(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: 'User not found' });
  }

  res.status(200).json({ status: 200, data: user });
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;

    const updatedUser = await updateUser(userId, updateData);

    if (!updatedUser) {
      return res.status(404).json({ status: 404, message: 'User not found' });
    }
    res.status(200).json({
      status: 200,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
