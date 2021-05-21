const express = require("express");

const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

app.use(express.json({ extended: false }));
app.use(cors());

connectDB();

app.use("/register", require("./routes/apis/register"));
app.use("/login", require("./routes/apis/login"));
app.use("/loanApplication", require("./routes/apis/loanApplication"));
app.use("/getUserLoans", require("./routes/apis/getUserLoans"));
app.use("/getUserDetails", require("./routes/apis/getUserdetails"));
app.use("/approveLoan", require("./routes/apis/approveLoan"));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.send("Server Up and Running"));
server.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
