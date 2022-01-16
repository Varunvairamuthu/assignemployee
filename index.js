        
const express = require('express');
const app = express();


 const bodyParser = require("body-parser");
 app.use(bodyParser.json());


app.listen(4000, ()=>{
    console.log("Sever is now listening at port 4000");
})

const {Pool,Client} = require('pg')
const connectionString = 'varun://postgres:12345muthu@localhost:5432/varun'

const client =new Client({
    connectionString:connectionString
});

client.connect()


//get all users 
app.get('/users', (req, res)=>{
    client.query(`SELECT* FROM public.users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})




//get user by id 
app.get('/users/:id', (req, res)=>{
    const user = req.body;
    client.query(`Select * FROM public.users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//add new user 
app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `INSERT INTO public.users(id, firstname, lastname, dept, salary, role,manager) 
                       values(${user.id}, 
                        '${user.firstname}', 
                        '${user.lastname}', 
                        '${user.dept}',
                        ${user.salary},
                        '${user.role}',
                        '${user.manager}'
                        )`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

// // update user details 
app.put('/users/:id', (req, res)=>{
     let user = req.body;
    let updateQuery = `UPDATE public.users     
                               SET id =${user.id},
                               SET firstname = '${user.firstname}',
                               SET lastname = '${user.lastname}',
                               SET dept = '${user.dept}',
                               SET salary = ${user.salary},  
                               SET role= '${user.role}',
                               SET manager ='${user.manager}'
                                where id = ${user.id}`;
                         
    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})



//delete user 

app.delete('/users/:id', (req, res)=> {
    let insertQuery = `DELETE FROM public."users"where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
});