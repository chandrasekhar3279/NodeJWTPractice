const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalsModel')
const express = require('express')

const getGoals =asyncHandler(async(req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

const getGoal = asyncHandler(async(req,res)=>{
    res.status(200).json({message:`Get ${req.params.id} goal`})
})

const updateGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    console.log(`goal data @ update ${goal}`)
    res.status(200).json(updatedGoal)
})

const createGoal = asyncHandler(async(req,res)=>{
    if(!req.body.text){
      res.status(400)
      throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text:req.body.text
    })
    res.status(200).json(goal)
})
const deleteGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    console.log(`goal data @ deletee ${goal}`)
    await goal.deleteOne() 
    res.status(200).json({id:req.params.id})
})

module.exports = {getGoals,getGoal,updateGoal,createGoal,deleteGoal}