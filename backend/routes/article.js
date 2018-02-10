const express = require("express");
const articledata = require("../models/article");

const router = express.Router();

module.exports = function (passport) {

    router.get("/", (req, res) => {
        articledata.find({}, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
    })

    router.get("/:id", (req, res) => {
        articledata.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
    })

    router.post("/", passport.authenticate("auth", { session: false }), (req, res) => {
        if (!req.files.articleImage) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.articleImage;
        //extLast mengambil extension dari file
        let date = new Date();
        let imageName = date.getTime() + ".png";


            image.mv("./public/articleimages/" + imageName, (error) => {
                if (error) return res.status(500).send(error);

                let newObj = new articledata({
                    
                    title: req.body.title.toLowerCase(),
                    excerpt: req.body.excerpt,
                    story: req.body.story,
                    articleImage: "http://localhost:3000/articleimages/" + imageName,
                    
                });

                newObj.save((error) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.json(newObj);
                    }
                });
            });
    });

    router.delete("/:id", (req, res) => {
        articledata.findByIdAndRemove(req.params.id, (error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.send({ message: "Data Deleted" })
            };
        });
    });

    router.put("/edit/:id", passport.authenticate("auth", { session: false }),(req, res) => {

        let newObj = {
            title: req.body.title,
            excerpt: req.body.excerpt,
            story: req.body.story,
            articleImage: req.body.articleImage,
            
        };

        articledata.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(500).json({message :"data updated"});
            };
        });
    });

    return router;
};