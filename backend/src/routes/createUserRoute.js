import { User } from "../models/user.model";
export const createUserRoute = {
  method: "POST",
  path: "/api/:anon_id/user",
  handler: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please fill Name" });
    }
    const { anon_id } = req.params;
    const user = await User.findOne({ anon_id });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      anon_id,
      name,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  },
};
