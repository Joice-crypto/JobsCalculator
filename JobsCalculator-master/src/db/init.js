const Database = require('./config');

Database();

Datababase.exec(`CREATE TABLE profile (
         id INTEGER PRIMARY KEY,
         name TEXT ,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT,
        hours_per_day INT,
        vocation_per_year INT,
        value_hour INT

    
    
    )`);
Datababase.exec(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME ,
       

   
   
   )`);

Database.run(
    `INSERT INTO profile(
        name,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vocation_per_year,
        value_hour
    ) VALUES (
        "Joice",
        "https://avatars.githubusercontent.com/u/66541373?v=",
        3000,
        5,
        5,
        4,
        75
    
    );` ) 

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    tottal_hours,
    created_at,  

) VALUES (
    "Pizzaria Gulosos",
    2,
    1,
    1619491033403
    

);`)

Database.run(`INSERT INTO jobs(
    name,
    daily_hours,
    tottal_hours,
    created_at,  

) VALUES (
    "OneTwo Projects",
    3,
    47,
    1619491033403
    

);`)



Database.close();





