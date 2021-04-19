const { req, res } = require('express'); //biblioteca para criar o servidor 
const express = require('express');
const routes = express.Router()

const views = __dirname + '/views/'

const profile = {

    name: "Joice",
    avatar: 'https://avatars.githubusercontent.com/u/66541373?v=4',
    monthlybudget: 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vocation-per-year": 4
}

// req e res
routes.get('/',(req, res) => res.render( views +'index'))
routes.get('/job',(req, res) => res.render( views +'job'))
routes.get('/job/edit',(req, res) => res.render(views + 'job-edit'))
routes.get('/profile',(req, res) => res.render(views + 'profile', {profile}))


module.exports = routes;  