const express = require('express')
const{getGoals,getGoal,createGoal,updateGoal,deleteGoal} = require('../controllers/goalController')

const router = express.Router()

router.route('/').get(getGoals).post(createGoal)
router.route('/:id').get(getGoal).put(updateGoal)
router.route('/:id').delete(deleteGoal)

module.exports = router