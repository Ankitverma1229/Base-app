import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import session from "express-session";
import passport from "passport";
import axios from "axios"; // Import for self-pinging
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import { connectDb } from "./config/connectDb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import fileRouter from "./routes/fileRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userdb from "./models/userSchema.js";
dotenv.config();

connectDb();
connectCloudinary();

const PORT = process.env.PORT || 6000;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const sessionSecret = process.env.SESSION_SECRET;
const clientUrl = process.env.CLIENT_URL;

const app = express();

app.use(
  cors({
    origin: `${clientUrl}`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "http://base-app-kxic.onrender.com"
  : `http://localhost:${PORT}`;

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: `${baseURL}/auth/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userdb.findOne({ googleId: profile.id });
        if (!user) {
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${clientUrl}/home`,
    failureRedirect: `${clientUrl}`,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/file", fileRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);

  // Self-ping mechanism
  setInterval(async () => {
    try {
      const response = await axios.get(`${baseURL}`);
      console.log("Self-ping successful:", response.data);
    } catch (error) {
      console.error("Error during self-ping:", error.message);
    }
  }, 600000); // 10 minutes in milliseconds
});
