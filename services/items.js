const dal = require("./pooldb");

const getItems = function() {
  if(DEBUG) console.log("menu_items-dal getItems()");
  return new Promise(function(resolve, reject) {
      const sql = "SELECT * FROM menu_items;"
      dal.query(sql, [], (err, result) => {
          if (err) {
              if(DEBUG) console.log(err);
              reject(err);
          } else {
              if(DEBUG) console.log(result.rows);
              resolve(result.rows);
          }
      }); 
  }); 
};

const getItemById = function(itemId){
    if(DEBUG) console.log("menu_items-dal getItemById()");
    return new Promise(function(resolve, reject) {
        const sql = "SELECT * FROM MENU_ITEMS WHERE item_id = $1 AND archived != true"
        dal.query(sql, [itemId], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                if(DEBUG) console.log(result.rows);
                resolve(result.rows);
            }
        }); 
    }); 
};

const addNewItem = function(item_id, item_name, price){
    if(DEBUG) console.log("menu_items-dal addNewBook(params)");
    return new Promise(function(resolve, reject) {
        const sql = "INSERT INTO MENU_ITEMS (item_id, item_name, price) VALUES ($1, $2, $3)";
        dal.query(sql, [item_id, item_name, price], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                if(DEBUG) console.log(result);
                resolve("Item added to database");
            }
        }); 
    }); 
}

const editItem = function(item_id, item_name, price, id){
    if(DEBUG) console.log("menu_items-dal editItem(params)");
    return new Promise(function(resolve, reject) {
        const sql = "UPDATE MENU_ITEMS SET item_id = $1, item_name = $2, price = $3 WHERE item_id = $4;";
        dal.query(sql, [item_id, item_name, price, id], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                if(DEBUG) console.log(result);
                resolve("Item has been edited");
            }
        }); 
    }); 
}

const deleteItem = function(itemId){
    if(DEBUG) console.log("menu_items-dal deleteItem(itemId)");
    return new Promise(function(resolve, reject) {
        const sql = "UPDATE MENU_ITEMS SET archived = true WHERE item_id = $1"
        dal.query(sql, [itemId], (err, result) => {
            if (err) {
                if(DEBUG) console.log(err);
                reject(err);
            } else {
                if(DEBUG) console.log(result);
                resolve("Operation Complete - Book has been archived/deleted");
            }
        }); 
    }); 
};

module.exports = {
    getItems,
    getItemById,
    addNewItem,
    editItem,
    deleteItem,
}