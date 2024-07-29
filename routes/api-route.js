const express = require('express');
const {getItems, getItemById, addNewItem, editItem, deleteItem} = require('../services/items.js');
const router = express.Router();


router.get("/items", async (request, response) => {
    if(DEBUG) console.log("get api items route")
    try{
        let items = await getItems();
        response.write(JSON.stringify(items));
        response.end()
    } catch{
        response.status(500).send('Server Error with Fetching');
    }
})

// A get request that takes the id param from the url
router.get("/items/id/:itemid", async (request, response) => {
    if(DEBUG) console.log("get api itemByID route.")
    try{
        let item = await getItemById(request.params.itemid);
        response.write(JSON.stringify(item));
        response.end()
    } catch{
        response.status(500).send('500 - Server error with data fetching.');
    }
})

// A put route that adds a book to the database
router.put("/items/add", async (request, response) => {
    if(DEBUG) console.log("post api items route.")
    try{
        let message = await addNewItem(request.body.item_id, request.body.item_name, request.body.price);
        response.write(message);
        response.end()
    } catch{
        response.status(500).send('500 - Server error with data fetching.');
    }
})

// A patch route that edits a book from the given id.
router.patch("/items/edit", async (request, response) => {
    if(DEBUG) console.log("post api items route.")
    try{
        let message = await editItem(request.body.item_id, request.body.item_name, request.body.price, request.body.id);
        response.write(message);
        response.end()
    } catch{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

router.delete("/items/delete", async (request, response) => {
    if(DEBUG) console.log("post api items route.")
    try{
        let message = await deleteItem(request.body.item_id);
        response.write(message);
        response.end()
    } catch{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

module.exports = router;
