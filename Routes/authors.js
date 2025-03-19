const express = require('express')
const router =  express.Router();
const authors =require("../data/authors")

router
    .route('/')
    .get((req,res)=>{
        res.json(authors)
    })
    .post((req,res)=>{
        if(req.body.authorname && req.body.email)
        {
            if(authors.find((author)=>author.authorname== req.body.authorname)){
                res.json({error:"Author name already exist"})
                return
            }
        }
    const author = {
        id:authors[authors.length -1].id +1,
        authorname: req.body.authorname,
        email: req.body.email
    }
    authors.push(author)
    res.json(authors[authors.length-1])
    })

    //Get,update or delete a specific author by ID
router
    .route('/:authorsID')
    .get((req, res) => {
    const author = authors.find((author)=> author.id == req.params.authorsID)
    if(author) {res.json(author)}
    else {res.status(404).send("author not found")}
})
    .patch((req,res,next)=>{
        const author=authors.find((author,i)=>{
            if(author.id == req.params.authorsID){
                for(const key in req.body){
                authors[i][key] = req.body[key]
                }
                return true
            }
           
        }) 
        if (author){ res.json(author);
        } else next()
    }) 
    .delete((req,res, next)=>{
        const author= authors.find((author,i)=>{
            if(author.id == req.params.authorsID){
                authors.splice(i,1)
                return true
            }
        })
        if(author) res.json(author)
            else next();
    })

    module.exports = router;