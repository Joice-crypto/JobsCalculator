
const Job = require('../model/Job');
const JobUtils = require('../Utils/jobUtils');
const Profile = require('../model/Profile');



module.exports = {
    index(req, res) {

        const jobs = Job.get();
        const profile = Profile.get();

        const statusCount = {

            progress:0,
            done:0,
            total:jobs.length
        
        }

        const updatedJobs = jobs.map((job) => {
            // calculo de tempo restante 
            //ajustes no job   

            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress' // se o remaining for menor ou igual a zero entao vai ser done se nao vai ser progress no status

            return {
                //pega o job e espalha ele com o remaning, status e budget dentro
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })


        return res.render('index', {
            jobs: updatedJobs, profile: profile,statusCount: statusCount
        })
    }
}