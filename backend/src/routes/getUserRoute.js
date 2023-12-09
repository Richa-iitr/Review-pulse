import { User } from "../models/user.model";
export const getUserRoute = {
  method: "get",
  path: "/api/:anon_id/user",
  handler: async (req, res) => {
    const { anon_id } = req.params;
    const user = await User.findOne({ anon_id });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json(user);
  },
};
