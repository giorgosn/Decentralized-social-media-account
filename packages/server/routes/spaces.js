const express = require('express');
const router = express.Router();

module.exports = function (router) {
     router.get('', function(req, res){
     res.json({ 'success' : true });
 });
};
