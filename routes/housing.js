const express = require('express');
const router = express.Router()
const House = require('../models/house')

// getting all
router.get('/', async (req, res) => {
    try {
        const houses = await House.find()
        res.send(houses)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//getting one
router.get('/:id', getHouse, (req, res) => {
    res.send(res.house.title)
})
//creating one
router.post('/', async (req, res) => {
    const house = new House({
        title: req.body.title,
        description: req.body.description,
    })
    try {
        const newHouse = await house.save()
        res.status(201).json(newHouse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//updating one
router.patch('/:id', getHouse, async (req, res) => {
    if (req.body.title != null) {
        res.house.title = req.body.title
    }
    if (req.body.description != null) {
        res.house.description = req.body.description
    }
    try {
        const updatedHouse = await res.house.save()
        res.json(updatedHouse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//deleting one
router.delete('/:id', getHouse, async (req, res) => {
    try {
        await res.house.deleteOne()
        res.json({ message: 'House deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getHouse(req, res, next) {
    let house
    try {
        house = await House.findById(req.params.id)
        if (house == null) {
            return res.status(404).json({ message: 'Cannot find house' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.house = house
    next()
}

module.exports = router;