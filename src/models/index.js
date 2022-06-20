const mongoose = require("mongoose");
const { MONGO_URI_CLOUD } = require("../configs");
mongoose.connect(MONGO_URI_CLOUD),
  {
    autoIndex: false,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
mongoose.connection.on("error", (err) => {
  console.error(`Connect err`, err);
  process.exit();
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB: ${MONGO_URI_CLOUD}`);
});
