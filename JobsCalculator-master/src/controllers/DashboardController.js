
const Job = require('../model/Job');
const JobUtils = require('../Utils/jobUtils');
const Profile = require('../model/Profile');



module.exports = {
  async  index(req, res) {

        const jobs = Job.get();
        const profile = await Profile.get();

        let statusCount = {

            progress:0,
            done:0,
            total:jobs.length
        
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            // calculo de tempo restante 
            //ajustes no job   

            //hrs de job no total (em progress)
           


            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress' // se o remaining for menor ou igual a zero entao vai ser done se nao vai ser progress no status

            //somando a quantidade de status
            statusCount[status] += 1

            if(status == 'progress'){

                jobTotalHours += Number(job['daily-hours'])

            }

            return {
                //pega o job e espalha ele com o remaning, status e budget dentro
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
          
        })

            // calcular a quantidade de horas livres 
            // qtd de hrs que quero trabalhar - quantidade de hrs de cada job
        
            

        const freeHours = profile['hours-per-day'] -  jobTotalHours
        return res.render('index', {
            jobs: updatedJobs, profile: profile,statusCount: statusCount, freeHours: freeHours
        })
    }
}