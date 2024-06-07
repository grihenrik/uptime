const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

const BASE_URL = "https://uptime.com/api/v1";

const corsOptions = {
  origin: "http://localhost:3000", // Your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  allowedHeaders: ["Content-Type", "Authorization", "Referer"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("*", cors(corsOptions));

app.post("/api/v1/auth/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }
  axios.defaults.withCredentials = true;
  const pf = await preflightRequest(`${BASE_URL}/auth/login`);
  if (!pf) {
    return;
  }
  console.log();
  axios.defaults.headers = {
    "Access-Control-Request-Method": "POST",
    "Access-Control-Request-Headers": "Content-Type",
  };

  axios
    .post(`${BASE_URL}/auth/login`, {
      email: req.body.email,
      password: req.body.password,
    })
    .then((response) => {
      const token = JSON.stringify({ token: response.data.access_token });
      console.log(token);
      res.send(token);
    })
    .catch((error) => {
      res.status(401).send("Invalid email or password");
    });
});

app.get("/api/v1/checks", (req, res) => {
  axios
    .get(`${BASE_URL}/checks`, {
      headers: {
        Authorization: `${req.headers.authorization}`,
      },
    })
    .then((response) => {
      const resData = response.data.results;
      console.log("response", resData);
      res.send(resData);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(401).send("Unauthorized");
    });
});

const preflightRequest = async (url) => {
  try {
    await axios.options(url, {
      headers: {
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type",
      },
    });
    console.log("Preflight successful");
    return true;
  } catch (error) {
    console.error("Preflight failed", error);
    return false;
  }
};

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
