let data = {


        name: "Joice",
        avatar: 'https://avatars.githubusercontent.com/u/66541373?v=4',
        monthlybudget: 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vocation-per-year": 4,
        "value-hour": 75

    };

    module.exports = {

        get(){
            return data;
        },
        update(newData){

            data = newData;
        }
    }