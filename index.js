const express = require('express')
const routes =express.Router()

const bodyParser = require('body-parser')
const app = express()
const PORT = 3000;


//middleware to parse JSON requests
app.use(express.json());

//import routes from the routes folder
const authors = require("./Routes/authors");
const books = require("./Routes/books");
const reviews = require("./Routes/reviews");

//middleware to log request details
const logRequestDetails = (req,res,next)=>{
    console.log(`${req.method} request made to ${req.url}`);
    next();
}

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))

//use the middleware globally
app.use(logRequestDetails);

app.use("/authors",authors)
app.use("/books",books)
app.use("/reviews",reviews)

// const books = require('./data/books');

app.set('view engine', 'ejs');

app.get('/books', (req, res) => {
    res.render('books', { books: books });
});

//root route
app.get('/', (req,res)=>{
    res.send(`Base Home page`)
})

app.get('/authors',(req,res)=>{
    res.json(authors)
})

app.get('/books',(req,res)=>{
    res.json(books)
})

 app.get('/authors/:authorID',(req,res)=>{
    res.json(authors)
 })
 app.get('/books/:bookID',(req,res)=>{
    res.json(books)
 })

 //Error-handling middleware
 app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({error:'details not found'})
 })

 //server listen the PORT
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})


