const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");

const app = express();
const PORT = 8000 || process.env.PORT;

const commentsRouter = require("./src/routes/commentsRouter");
const postsRouter = require("./src/routes/postsRouter");
const userAccountsRouter = require("./src/routes/userAccountsRouter");

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/user", userAccountsRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    })
  })
  

mongoose.connect(process.env.DBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(app.listen(PORT, () =>
        console.log(`Server listening on PORT ${PORT}`)))
    .catch((err) => console.log(err));


