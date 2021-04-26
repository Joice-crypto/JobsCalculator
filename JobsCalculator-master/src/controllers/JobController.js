const Job = require('../model/Job');
const JobUtils = require('../Utils/jobUtils');
const Profile = require('../model/Profile');

module.exports = {

    create(req, res) {

        return res.render("job")

    },
    save(req, res) {

        const jobs = Job.get()

        const lastId = jobs[jobs.length - 1] ?.id || 0 // vai pegar o jobs length e subtrair 1 posição porem se for o primeiro job vai colocar o id 1


        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now // Atribuindo a data de hoje

        }) // vai empurrar o req body para a minha const jobs
        return res.redirect('/')


    },
    show(req, res) {

        const jobs = Job.get();
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId)) // vai procurar o id no job e verificar se é igual

        if (!job) // se nao tiver job 
        {
            return res.send("Job not found !")
        }

        const profile = Profile.get();
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", {
            job
        })

    },
    update(req, res) {

        const jobs = Job.get();

        const jobId = req.params.id // pega o numero do projeto pelo id

        const job = jobs.find(job => Number(job.id) === Number(jobId)) // vai procurar o id no job e verificar se é igual

        if (!job) // se nao tiver job 
        {
            return res.send("Job not found !")
        }

        const updatedJob = {

            ...job,
            name: req.body.name,
            "total-hours": job["total-hours"],
            "daily-hours": job["daily-hours"]


        }

        const newJobs = jobs.map(job => {

            if (Number(job.id) === Number(jobId)) {

                job = updatedJob
            }

            return job
        })

        Job.update(newJobs);

        res.redirect('/job/' + jobId)
    },
    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId);

        return res.redirect('/')
    }
}