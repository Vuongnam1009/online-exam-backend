const permission = require("../models/permission");
const router = require("express").Router();

router.post("/permissions", async (req, res) => {
  const { name, method, uri, type, groupPermission } = req.body;
  const data = await permission.create({
    name,
    method,
    uri,
    type,
    groupPermission,
  });
  res.send({ status: 1, permission: data });
});

module.exports = router;
