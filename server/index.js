const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'passsword',  
    database: "employee",

    
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.post('/create',(req, res) =>{
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;

    db.query('INsERT INTO new_table (name, age, country,position, salary)VALUEs(?,?,?,?,?)',
    [name,age,country,position,salary],
    (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Values Inserted");
        }
    }
    );
});

app.get("/employees", (req, res) =>{
    db.query("sELECT * FROM new_table",(err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.put("/update", (req, res) =>{
    const ID = req.body.ID;
    const salary = req.body.salary;
    db.query("UPDATE new_table SET Salary = ? WHERE ID = ?",
    [salary, ID],
     (err, result) => {
        if(err){
            console.log(err);
        
        }else{
            res.send(result);
        };
    });

});

app.delete("/delete/:ID", (req, res) => {
    const ID = req.params.ID;
    db.query("DELETE FROM new_table WHERE ID = ?", ID, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

});

app.listen(8000,() =>{
    console.log("yeah ,your sever is in running condition");

});