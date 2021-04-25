
// MAP,FOREACH,FIND,FILTER


const {
    req,
    res
} = require('express'); //biblioteca para criar o servidor 
const express = require('express');
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {

    data: {
        

            name: "Joice",
            avatar: 'https://avatars.githubusercontent.com/u/66541373?v=4',
            monthlybudget: 3000,
            "days-per-week": 5,
            "hours-per-day": 5,
            "vocation-per-year": 4,
            "value-hour": 75
        
    },
    controllers: {

        index(req, res){

           return res.render(views + 'profile', { profile: Profile.data})


        },
        update (req,res) {

            const data = req.body

            //definir quantas semanas tem em 1 ano (52)
            const weeksPerYear = 52;
            // remover as semanas de ferias que eu tiro no ano
            const weeksPerMonth = (weeksPerYear - data["vocation-per-year"]) / 12 
            // total de horas trabalhadas na semana
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]


            // horas trabalhadas no mês 
            const monthlyTotalHours = weekTotalHours * weeksPerMonth 
            // valor da minha hora
          const valueHour =  Number(data["value-hour"] = data["monthlybudget"] / monthlyTotalHours)

          Profile.data = {

            ...Profile.data,
            ...req.body,
            "value-hour": valueHour

          }

          return res.redirect('/profile');
        }

    }


}

const Job = {

    data: [
        {
            id: 1,
            name: 'Pizzaria Guloso',
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now(),
            budget:4500 
        },
    
        {
            id: 2,
            name: 'OneTwo Project',
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now(),
            budget: 4500
        }

    ],
    controllers: {
        index(req, res) {


            const updatedJobs = Job.data.map((job) => {
                // calculo de tempo restante 
                //ajustes no job   

                const remaining = Job.services.remainingDays(job);
                const status = remaining <= 0 ? 'done' : 'progress' // se o remaining for menor ou igual a zero entao vai ser done se nao vai ser progress no status

                return {
                    //pega o job e espalha ele com o remaning, status e budget dentro
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })


            return res.render(views + 'index', {
                jobs: updatedJobs
            })


        },
        create(req, res) {

            return res.render(views + "job")

        },
        save(req, res){

            const lastId = Job.data[Job.data.length - 1]?.id || 0 // vai pegar o jobs length e subtrair 1 posição porem se for o primeiro job vai colocar o id 1


         Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now // Atribuindo a data de hoje

            }) // vai empurrar o req body para a minha const jobs
        return res.redirect('/')


        },
        show (req, res){

            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId)) // vai procurar o id no job e verificar se é igual

            if(!job) // se nao tiver job 
            {
                return res.send("Job not found !")
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(views + "job-edit" , { job })

      },
         update (req, res){

        const jobId = req.params.id // pega o numero do projeto pelo id

        const job = Job.data.find(job => Number(job.id) === Number(jobId)) // vai procurar o id no job e verificar se é igual

        if(!job) // se nao tiver job 
        {
            return res.send("Job not found !")
        }

        const updatedJob = {

            ...job,
            name:req.body.name,
            "total-hours":job["total-hours"],
            "daily-hours":job["daily-hours"]


        }

        Job.data = Job.data.map(job => {

            if(Number(job.id)=== Number(jobId)){

                job = updatedJob
            }

            return job
        })

        res.redirect('/job/' + jobId)
      },
        delete (req,res){
            const jobId = req.params.id

                // vai procurar se o id é igual se for igual vai manter se for diferente vai deletar
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },
    services: {
        remainingDays(job) {

            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() // faz o calculo de dias restantes do job
            const createdDate = new Date(job.created_at) // pegar a data de criação do job
            const dueDay = createdDate.getDate() + Number(remainingDays) // pega a data do jobe  soma com os dias restantes para devolver a data do vencimento do job 
            const dueDateInMs = createdDate.setDate(dueDay)
        
            const timeDiffInMs = dueDateInMs - Date.now() // pega a data limite menos a data de hoje
        
            // transform milliseconds in days
            const dayInMs = 1000 * 60 * 60 * 24
        
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
        
            return dayDiff //restam x dias
        
        
        },
        
        calculateBudget: (job, valueHour) =>  valueHour * job["total-hours"]

    }
}

 

// req e res
routes.get('/', Job.controllers.index);
routes.get('/job',  Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;