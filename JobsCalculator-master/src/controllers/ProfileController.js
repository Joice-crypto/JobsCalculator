
const Profile = require('../model/Profile')

module.exports = {

  async  index(req, res){

       return res.render('profile', { profile: await Profile.get()})


    },
  async  update (req,res) {

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

      const profile = await Profile.get()

      Profile.update({ 

        ...profile,
        ...req.body,
        "value-hour": valueHour


      }) 

      return res.redirect('/profile');
    }

}