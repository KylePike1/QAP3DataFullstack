const {getItems, getItemById, addNewItem, editItem, deleteItem} = require('../services/items.js');
const express = require('express');

const router = express.Router();

router.get('', (request, response) =>{
    response.render('index')
});


router.get('/items', async (request, response) =>{
    const items = await getItems()
    response.render('items' , {items : items})
});

router.get('/items/add', async (request, response) =>{
    response.render('addItem')
});

router.post('/items/add', async (request, response) =>{
    const message = await addNewItem(request.body.item_id, request.body.item_name, request.body.price)
    console.log(message);
    if(message == "Item added to database"){
        response.render('items');
    }
    else{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

router.get('/items/edit/:itemid', async (request, response) =>{
    const item = await getItemById(request.params.itemid)
    if(item[0] != undefined){
        response.render('editItem' , {item : item[0]})
    }
    else{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

router.post('/items/edit/:itemid', async (request, response) =>{
    const message = await editItem(request.body.item_id, request.body.item_name, request.body.price)
    console.log(message);
    if(message == "Item has been edited"){
        response.render('items');
    }
    else{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

// delete book confirmation page
router.get('/items/delete/:itemid', async (request, response) =>{
    if(DEBUG) console.log("get ui delete route.")
    const item = await getItemById(request.params.itemid)
    if(item[0] != undefined){
        response.render('deleteItem' , {item : item[0]})
    }
    else{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

// edit item result
router.post('/items/edit/:itemid', async (request, response) =>{
    const message = await editItem(request.body.item_id, request.body.item_name, request.body.price)
    console.log(message);
    if(message == "Item has been edited"){
        response.render('items');
    }
    else{
        response.status(500).send('500 - Server error with data fetching.');
    }
});



// delete book result
router.post("/items/delete/:itemid", async (request, response) => {
    if(DEBUG) console.log("post ui delete route.")
    const message = await deleteItem(request.params.itemid)
    if(message == "Item has been deleted"){
        response.render('items')
    }
    else{
        response.status(500).send('500 - Server error with data fetching.');
    }
});

module.exports = router;