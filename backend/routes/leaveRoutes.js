const express = require('express');
const leaveController = require('../controllers/leaveController');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// 🔁 Custom route for personal leave history
router.get('/mine', leaveController.getMyLeaves);

// ✅ Standard routes
router.route('/')
  .get(leaveController.getAllLeaves)
  .post(leaveController.createLeave);

// ✅ Status update (manager only)
router.patch('/:id/status', restrictTo('manager'), leaveController.updateLeaveStatus);

// ✅ Param routes (must come last)
router.route('/:id')
  .get(leaveController.getLeave)
  .delete(leaveController.deleteLeave);

module.exports = router;
