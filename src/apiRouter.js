const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Router 1 GET");
});
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Router 1 POST");
});
router.put("/", (req, res) => {
  res.send("Router 1 PUT");
});
router.delete("/", (req, res) => {
  res.send("Router 1 DELETE");
});

router.get("/product", (req, res) => {
  res.send("product");
});
router.get("/cart", (req, res) => {
    res.send("cart");
  });

module.exports = router;
