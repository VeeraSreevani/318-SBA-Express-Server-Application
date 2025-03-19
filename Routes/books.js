
const express = require('express')
const router = express.Router();
const books = require('../data/books')
const reviews = require('../data/reviews')

router
    .route('/')
    .get((req,res)=>{
        res.json(books)
    })
    .post((req,res)=>{
        if(req.body.authorID && req.body.title && req.body.description){
            const book = {
                id: books[books.length - 1].id +1,
                authorId: req.body.authorId,
                title:req.body.title,
                description: req.body.description
            }
            books.push(book)
            res.json(books[books.length -1])
        }else res.json({error: "insufficient data"})
    })

//get,update, or delete a specific book by ID
router
    .route('/:booksID')
    .get((req,res)=>{
    const book=books.find((book)=>book.id == req.params.booksID)
    if(book){res.json(book)}
    else {res.status(404).send("book not found")}
})
    .patch((req,res)=>{
        const book = books.find((book,i)=>{
            for(const key in req.body){
                books[i][key]= req.body[key]
            }
            return true
        })
        if(book){res.json(book)}
        else {res.status(404).send("book not found")}
    })
    .delete((req,res)=>{
        const book = books.find((book,i)=>{
            if(book.id == req.params.booksID){
                books.splice(i,1)
                return true
            }

        })
        if(book){res.json(book)}
        else {res.status(404).send("book not found")}
    })

    router
        .route("/:booksID/reviews")
        .get((req,res)=>{
            const reviews = require("../data/books")
            res.json(books.filter(review =>review.bookId===req.params.booksID))
        })


module.exports = router;