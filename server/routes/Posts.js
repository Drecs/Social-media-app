const express = require('express');
const router = express.Router()
const { Posts, Likes } = require("../models");
const { ValidateToken} =require('../middlewares/AuthMiddleware')



router.get("/", ValidateToken, async (req, res) =>{
    const listOfPosts = await Posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({where:{ UserId: req.user.id }});
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

router.get("/byId/:id", async (req, res) => {
    const id= req.params.id
    const Post = await Posts.findByPk(id);
    res.json(Post);

});

router.get("/byuserId/:id", async (req, res) => {
    const id= req.params.id
    const listOfPosts = await Posts.findAll({ where: { 
        UserId: id}, include: [Likes]});
    res.json(listOfPosts);

});

router.post("/", ValidateToken, async (req, res) => {
    const post = req.body
    post.UserName = req.user.UserName;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);

});

router.delete("/:postId", ValidateToken, async (req, res) => {
    const postId = req.params.postId;
    
    await Posts.destroy({where:{
        id: postId},
    });

    
    res.json("Post deleted successfully");

});





module.exports  = router;

