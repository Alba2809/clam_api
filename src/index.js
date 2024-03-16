import app from './app.js'
import { connectDB } from "./db.js";

app.listen(3500)
console.log('Server on port', 3500)
connectDB();
