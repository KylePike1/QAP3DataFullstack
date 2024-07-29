const express = require('express');
const app = express();

const apiRoutes = require('./routes/api-route');
const uiRoutes = require('./routes/ui-route');

const PORT =  3000;

global.DEBUG = true;
if(DEBUG){
    app.use((request, response, next) => {
        console.log(request.method+", "+request.url)
        next()
    })
}

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));


// I first have it check to see if the url is an api request. If so, check the api routes.
app.use('/api', apiRoutes);
// I then check the website/ui routes
//app.use('/', uiRoutes)
// If no route is found, give a 404
app.use((request, response) => {
    if(DEBUG) console.log('404 - route not found.');
    response.status(404).write('404 - route not found.');
    response.end();
}) 

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});