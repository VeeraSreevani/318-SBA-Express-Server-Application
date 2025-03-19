const express = require('express');
const router = express.Router();
const reviews = require('../data/reviews'); 

// Route for handling all reviews (GET and POST)
router
    .route("/")
    .get((req, res) => {
        // Query parameters to filter reviews
        const { bookId, userId } = req.query;
        let filteredReviews = reviews;

        if (bookId) {
            filteredReviews = filteredReviews.filter(review => review.bookId == bookId);
        }
        if (userId) {
            filteredReviews = filteredReviews.filter(review => review.userId == userId);
        }
        
        res.json(filteredReviews); // Return the filtered reviews based on the query params
    })
    .post((req, res) => {
        if (req.body.userId && req.body.bookId && req.body.content) {
            const newReview = {
                id: Number(reviews[reviews.length - 1].id) + 1, // Incrementing ID
                userId: req.body.userId,
                bookId: req.body.bookId,
               content: req.body.content
            };

            reviews.push(newReview); // Add new review to the array
            res.status(201).json(newReview); 
        } else {
            res.status(400).json({ error: "Insufficient data" }); 
        }
    });

// Route for handling a single review by its ID (GET, PATCH, DELETE)
router
    .route('/:reviewID')
    .get((req, res) => {
        const review = reviews.find(review => review.id == req.params.reviewID);
        if (review) {
            res.json(review); // Return the review if found
        } else {
            res.status(404).json({ error: "Review not found" }); 
        }
    })
    .patch((req, res) => {
        const review = reviews.find((review, i) => {
            if (review.id == req.params.reviewID) {
                // Update the fields of the review
                for (const key in req.body) {
                    reviews[i][key] = req.body[key];
                }
                return true;
            }
        });

        if (review) {
            res.json(review); // Respond with the updated review
        } else {res.status(404).send("comment not found")}
    })
    .delete((req, res) => {
        const review = reviews.find((review, i) => {
            if (review.id == req.params.reviewID) {
                reviews.splice(i, 1); // Remove the review from the array
                return true;
            }
        });

        if (review) {
            res.json(review); 
        } else {
            res.status(404).json({ error: "Review not found" }); 
        }
    });

module.exports = router;
