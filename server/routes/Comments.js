const express = require('express');
const router = express.Router();
const { Comments } = require("../models");
const { ValidateToken } = require('../middlewares/AuthMiddleware');

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { postId: postId } });
    res.json(comments);
});

router.post("/", ValidateToken, async (req, res) => { 
    const comment = req.body;
    const username = req.user.UserName;
    comment.UserName= username;
    await Comments.create(comment);
    res.json(comment);
});

router.delete('/:commentId', ValidateToken, async(req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({where:{
        id: commentId},
    });

    res.json("Comment deleted successfully");

});

module.exports = router;

