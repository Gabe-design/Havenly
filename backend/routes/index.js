const express = require('express');
const path = require('path'); 
const router = express.Router();

// ✅ Ensure paths always use forward slashes (`/`)
const normalizePath = (route) => route.split(path.sep).join('/');

router.get(normalizePath("/api/csrf/restore"), (req, res) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.status(200).json({ "XSRF-Token": req.csrfToken() });
});

// ✅ Import authentication routes
const authRouter = require('./auth');
router.use(normalizePath('/auth'), authRouter);

router.get(normalizePath('/test'), (req, res) => {
  res.json({ message: 'API is working!' });
});

// ✅ Debug: Log routes
console.log("Registered routes:");
console.log(normalizePath("/api/csrf/restore"));
console.log(normalizePath("/test"));

module.exports = router;
