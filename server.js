const express = require('express');

const app = express();
const PORT=process.env.PORT || 8080
// Serve only the static files form the dist directory
app.use(express.static('./dist/mytodo'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/mytodo/'}),
);

// Start the app by listening on the default Heroku port
app.listen(PORT,()=>{
console.log("server is listening on PORT ",PORT);
});
