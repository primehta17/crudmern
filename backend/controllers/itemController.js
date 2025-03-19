const Item = require('../models/Item');

//Get all items
const getItems = async (req,res) => {
    const items = await Item.find({user: req.user.id});
    res.json(items);
}

//Create item
const createItem = async (req,res) => {
    const {name, description} = req.body;
    const item = await Item.create({name, description, user: req.user.id});
    res.status(201).json(item);
}

//Update item
const updateItem = async (req,res) => {
    const item = await Item.findById(req.params.id);
    if(item.user.toString() !== req.user.id){
        res.status(401).json({message: 'Not authorized'});
        return;
    }
    if(item){
        item.name = req.body.name || item.description;
        item.description = req.body.description || item.description;
        const updateItem = await item.save();
        res.json(updatedItem);
    }else{
        res.status(404).json({message: 'Item not found'});
    }
};

//Delete item
const deleteItem = async (req,res) => {
    const item = await Item.findById(req.params.id);
    if(item.user.toString() !== req.user.id){
        res.status(401).json({message:'Not outhorized'});
        return;
    }

    if(item){
        await item.remove();
        res.json({message: 'Item removed'});
    }else{
        res.status(404).json({message: 'Item not found'});
    }
};

module.exports = { getItems, createItem, updateItem, deleteItem };