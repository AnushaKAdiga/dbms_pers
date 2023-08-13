const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt');
const { query } = require('express');
//const userModel= require("../routes/user");
const db = mysql.createConnection({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  
  });
  let studt_id;
  exports.eventregister=(req,res)=>{
    db.query('insert into registers_to set ?',{stud_id:studt_id,event_id:req.params.id},(error,results)=>{
        if(error){
            console.log(error);
        }else{
            console.log(results);
        }
    });

  }
  exports.viewreport=(req,res)=>{
    db.query('select * from events_jssstu where Event_ID=?',[req.params.id],(error,rows)=>{
        console.log(rows);
        rows.forEach(item=>{
            item.Date=item.Date.toLocaleDateString();
            console.log(item.Date);
           })
        res.render('report1',{rows});
    })
  }
// exports.report1=(req,res)=>{
//     let id=req.params.id;
//     db.query('select * from events_jssstu where Event_ID=?',[id],(error,rows)=>{
//         rows.forEach(item=>{
//             item.Date=item.Date.toLocaleDateString();
//             console.log(item.Date);
//            })
//            console.log('hoiiii');
//            console.log(rows);
//         res.render('report1',{rows});
//     })
    
// }
exports.useri=(req,res)=>{
    db.query('SELECT * FROM events_jssstu', (err, rows) => {
        console.log(rows);
  
        // When done with the connection, release it
       // db.release();
       rows.forEach(item=>{
        item.Date=item.Date.toLocaleDateString();
        console.log(item.Date);
       })
       
        if (!err) {
         // let removedUser = req.query.removed;
          res.render('userindex', { rows });
        } else {
          console.log(err);
        }
        console.log('The data from Events table: \n', rows);
         });
  
}


exports.viewsignup=(req,res)=>{
    res.render('signup');
}
exports.viewsignupa=(req,res)=>{
    res.render('signupa');
}
exports.viewlogin=(req,res)=>{
    res.render('login');
}
exports.viewlogina=(req,res)=>{
    res.render('logina');
}
exports.viewsevent=(req,res)=>{
    res.render('admintable');
}

exports.home=(req,res)=>{
    res.render('home');
}
exports.stats=(req,res)=>{
    let id=req.params.id;
    db.query('select * from user where Student_id in(select stud_id from registers_to where event_id=?)',[id],(error,rows)=>{
        if(error){
            console.log(error);
        }
        res.render('report2',{rows});
    })
}
exports.userv=(req,res)=>{
    db.query('select * from user where Student_id=?',[studt_id],(error,rows)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log('this is the nav bar');
            console.log(studt_id);
            res.render('user',{rows});

        }
    })
    
}

exports.register=(req,res)=>{
    console.log(req.body);
    const std_id=req.body.std_id;
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const deptname=req.body.deptname;
    const password=req.body.password; 
    const passwordConfirm=req.body.passwordConfirm;
   /* let d_id;
    function fun(dname){
        let d_id;
        db.query('select Department_ID from department where Department_name=?',[dname],(error,results)=>{
            if(error){
                console.log(error);
            }
           // console.log('hi')
          //  console.log(results[0]);
            d_id= results[0].Department_ID;
          //  console.log(d_id);
          console.log('inside the function');
        console.log(d_id);
          return d_id;


        });
        
        
    }
    */
    
    db.query('select user_email from user where user_email=?',[email], async (error,results) =>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return res.render('signup',{
                message:'That email is already in use'
            })

        }else if(password !=passwordConfirm){
        return res.render('signup',{
            message:'Passwords do not match'
        });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log('Hashed password is');
        console.log(hashedPassword);
    /*  db.query('select Department_ID from department where Department_name=?',[dname],(error,results)=>{
            if(error){
                console.log(error);
            }
            console.log('hi')
            console.log(results[0]);
            d_id= results[0].Department_ID;
            console.log(d_id);


        });*/
       // let d_id;

        //const  query = util.promisify(db.query).bind(db)

        /*async function fun(dname){
            var  result = [];
            try {
                const rows = await query('select Department_ID from department where Department_name=?',[dname]);
            } finally {
                return result;
            }
        }*/

        // async function fun(dname){
        //     let d_id;
        //     let result = await db.query('select Department_ID from department where Department_name=?',[dname],(error,results)=>{
        //         if(error){
        //             console.log(error);
        //         }
        //        // console.log('hi')
        //       //  console.log(results[0]);
        //         d_id= results[0].Department_ID;
        //       //  console.log(d_id);
        //       console.log('inside the function');
        //     console.log( typeof d_id);
        //       return d_id;
    
    
        //     });
            
        //     return result;
        // }
        // let  ans = fun(dname);
        
        db.query('insert into user set ? ',{Student_id:std_id,user_email:email,user_phone_no:phone,student_name:name,deptname:deptname,password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('signup',{
                    message:'User registered'
                }
                );
            }
        });

    });

   // res.render('signup');
}
exports.signin=(req,res)=>{
    console.log('HIIII');
       // const {email,user_password}=req.body;
       console.log(req.body);
       const email=req.body.email;
       const user_pass=req.body.password;
        console.log(email);
    try{
        db.query('select password,Student_id,student_name from user where user_email=?',[email],async (error,rows)=>{
          console.log('signin');
           console.log(rows);
            if(rows.length>0){
                console.log(rows[0].password);
           const comparison= await bcrypt.compare(user_pass,rows[0].password);
            if(comparison){
                console.log('Successfull!!')
             //res.render('user',{rows});
             studt_id=rows[0].Student_id;
             console.log(studt_id);

             return res.render('user',{rows});
            
             


            }else{
                console.log('Unsuccesfull!!')
                return res.render('login',{
                    message:'Incorrect Credentials'
                });

            }
        }else{
            console.log('yayyy')
            return res.render('login',{
                message:'Email Not Registered'
            });

        }


            
        })

    }catch(error){
        console.log(error);

    }
}
exports.signina=(req,res)=>{
    console.log('HIIII');
       // const {email,user_password}=req.body;
       console.log(req.body);
       const email=req.body.admin_email;
       const admin_pass=req.body.password;
        console.log(email);
    try{
        db.query('select password,admin_id,username from admin where admin_email=?',[email],async (error,rows)=>{
          console.log('signin');
           console.log(rows);
            if(rows.length>0){
                console.log(rows[0].password);
           const comparison= await bcrypt.compare(admin_pass,rows[0].password);
            if(comparison){
                console.log('Successfull!!')
             //res.render('user',{rows});
            //  studt_id=rows[0].admin_id;
            //  console.log(studt_id);

             return res.render('admin',{rows});
            
             


            }else{
                console.log('Unsuccesfull!!')
                return res.render('logina',{
                    message:'Incorrect Credentials'
                });

            }
        }else{
            console.log('yayyy')
            return res.render('logina',{
                message:'Email Not Registered'
            });

        }


            
        })

    }catch(error){
        console.log(error);

    }
}
exports.viewindex=(req,res)=>
{
   
       
    
        db.query('SELECT * FROM events_jssstu', (err, rows) => {
          console.log(rows);
    
          // When done with the connection, release it
        //   connection.release();
         rows.forEach(item=>{
          item.Date=item.Date.toLocaleDateString();
          console.log(item.Date);
         })
         
          if (!err) {
           // let removedUser = req.query.removed;
            res.render('index', { rows });
          } else {
            console.log(err);
          }
          console.log('The data from Events table: \n', rows);
           });
    
          }

exports.registera=(req,res)=>{
    console.log(req.body);
    const ad_id=req.body.ad_id;
    const email=req.body.admin_email;
    const event_org=req.body.Eventorg;
    const name=req.body.username;
    const password=req.body.password;
    const passwordConfirm=req.body.cpassword;
   /* let d_id;
    function fun(dname){
        let d_id;
        db.query('select Department_ID from department where Department_name=?',[dname],(error,results)=>{
            if(error){
                console.log(error);
            }
           // console.log('hi')
          //  console.log(results[0]);
            d_id= results[0].Department_ID;
          //  console.log(d_id);
          console.log('inside the function');
        console.log(d_id);
          return d_id;


        });
        
        
    }
    */
    
    db.query('select admin_email from admin where admin_email=?',[email], async (error,results) =>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return res.render('signupa',{
                message:'That email is already in use'
            })

        }else if(password !=passwordConfirm){
        return res.render('signupa',{
            message:'Passwords do not match'
        });
        }
        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);
    /*  db.query('select Department_ID from department where Department_name=?',[dname],(error,results)=>{
            if(error){
                console.log(error);
            }
            console.log('hi')
            console.log(results[0]);
            d_id= results[0].Department_ID;
            console.log(d_id);


        });*/
       // let d_id;

        //const  query = util.promisify(db.query).bind(db)

        /*async function fun(dname){
            var  result = [];
            try {
                const rows = await query('select Department_ID from department where Department_name=?',[dname]);
            } finally {
                return result;
            }
        }*/

        // async function fun(dname){
        //     let d_id;
        //     let result = await db.query('select Department_ID from department where Department_name=?',[dname],(error,results)=>{
        //         if(error){
        //             console.log(error);
        //         }
        //        // console.log('hi')
        //       //  console.log(results[0]);
        //         d_id= results[0].Department_ID;
        //       //  console.log(d_id);
        //       console.log('inside the function');
        //     console.log( typeof d_id);
        //       return d_id;
    
    
        //     });
            
        //     return result;
        // }
        // let  ans = fun(dname);
        
        db.query('insert into admin set ? ',{admin_id:ad_id,admin_email:email,Eventorg:event_org,username:name,password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('signupa',{
                    message:'Admin registered'
                }
                );
            }
        });

    });

   // res.render('signup');
}