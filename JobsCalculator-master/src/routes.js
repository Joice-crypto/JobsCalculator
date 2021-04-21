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

/* {
  name: 'Joice Cristiana da Silva Santos',
  'daily-hours': '0.4',
  'total-hours': '3'
}
*/
const jobs = [
    {
        id:1,
        name: 'Pizzaria Guloso',
        "daily-hours": 2,
        "total-hours": 60,
        created_at:Date.now ()
    },

   { id:2,
        name: 'OneTwo Project',
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now ()
   }
]

// req e res
routes.get('/',(req, res) => res.render( views +'index', {jobs}));
routes.get('/job',(req, res) => res.render( views +'job'));
routes.post('/job',(req, res) => {

    const lastId = jobs[jobs.length - 1]?.id || 1; // vai pegar o jobs length e subtrair 1 posição porem se for o primeiro job vai colocar o id 1

  
    jobs.push({
        id: lastId + 1,
        name:req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now // Atribuindo a data de hoje

    })  // vai empurrar o req body para a minha const jobs
    return res.redirect('/')       

});
routes.get('/job/edit',(req, res) => res.render(views + 'job-edit'));
routes.get('/profile',(req, res) => res.render(views + 'profile', {profile}));


module.exports = routes;  