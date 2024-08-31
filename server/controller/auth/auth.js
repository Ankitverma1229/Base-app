import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.googleId) {
        return res
          .status(400)
          .json({
            error:
              "This email is registered with Google. Please use Google login.",
          });
      } else {
        return res.status(400).json({ error: "Email already in use." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      displayName: "", 
    });

    await newUser.save();

    req.session.userId = newUser._id;

    res.status(201).json({ user: newUser, message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    if (user.googleId) {
      return res
        .status(400)
        .json({
          error:
            "This email is registered with Google. Please use Google login.",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    console.log("first", req.user);
    req.session.userId = user._id;

    res.status(200).json({ user, message: "Login successfull!!" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
};

export const loginSuccess = async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "Login successful", user: req.user });
  } else {
    res.status(400).json({ error: "Not Authorized" });
  }
};
