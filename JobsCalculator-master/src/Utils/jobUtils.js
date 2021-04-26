

module.exports={
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