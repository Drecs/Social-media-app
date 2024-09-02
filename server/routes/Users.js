const express = require('express');
const router = express.Router()
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require('jsonwebtoken');
const { ValidateToken} =require('../middlewares/AuthMiddleware')

router.post("/", async (req, res) => {
    const{ UserName, Password} = req.body;
    bcrypt.hash(Password, 10).then((hash)=> {
        Users.create({
            UserName: UserName,
            Password: hash,
        });
        res.json('success');
    });
});

router.post("/login", async (req, res) => {
    const { UserName, Password } = req.body;

    const user = await Users.findOne({ where: { UserName: UserName } });
    if (!user) {
        return res.json({ error: "User doesn't exist" });
    }

    bcrypt.compare(Password, user.Password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong username and password combination" });
        }
        const accessToken = sign({ UserName: user.UserName, id: user.id },
             "importantsecret"
            );
        res.json({token: accessToken, UserName:UserName,id: user.id});
    });
});

router.get('/auth', ValidateToken, (req, res)=>{
    res.json(req.user);
});

router.get('/basicinfo/:id', async (req, res) => {
    const id = req.params.id;
    
    const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ['Password'] }
    });

    res.json(basicInfo);
});

module.exports  = router;