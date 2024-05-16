import { FRONTEND_URL } from "./config.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import artistRoutes from "./routes/artist.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import staffRoutes from "./routes/staff.routes.js";

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  const htmlresponse = `
  <html>
  <head>
  <title>API</title>
  </head>
  <body>
  <h1>API desplegado</h1>
  </body>
  </html>
  `;
  res.send(htmlresponse);
});

app.use("/api/artist", artistRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/staff", staffRoutes);

export default app;
