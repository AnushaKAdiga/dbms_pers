const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 100,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME

});


exports.events=(req,res)=>{
  pool.query('select Event_ID,Event_Name,Venue,Date from events_jssstu where Event_ID in(select event_id from registers_to where stud_id=?)', [req.params.id], (error,rows)=>{
    console.log('Render Succesful!');
    console.log(req.params.id);
    if(error)console.log(error);
    let id=req.params.id;
    rows.forEach(item=>{
      item.Date=item.Date.toLocaleDateString();
      console.log(item.Date);
     })

    console.log(rows);
     res.render('myevents',{rows});
  });}
// Connection Pool
/*
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
/*
*/
// View Users
/*
exports.register=(req,res)=>{
  console.log(req.body);
  res.send("Sign Up succeSsfull!");
}
*/
exports.homev=(req,res)=>{
  res.render("home");
}
exports.adminv=(req,res)=>{
  res.render("admin");
}
exports.viewind=(req,res)=>{
  pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('connected as ID'+connection.threadId);

    connection.query('SELECT * FROM events_jssstu', (err, rows) => {
      console.log(rows);

      // When done with the connection, release it
      connection.release();
     rows.forEach(item=>{
      item.Date=item.Date.toLocaleDateString();
      console.log(item.Date);
     })
     
      if (!err) {
       // let removedUser = req.query.removed;
        res.render('admintable', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from Events table: \n', rows);
       });

      });
}
/*
exports.view = (req, res) => {
  pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('connected as ID'+connection.threadId);

    connection.query('SELECT * FROM events_jssstu', (err, rows) => {

      // When done with the connection, release it
      connection.release();
     rows.forEach(item=>{
      item.Date=item.Date.toLocaleDateString();
      console.log(item.Date);
     })
     
      if (!err) {
       // let removedUser = req.query.removed;
        res.render('home', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from Events table: \n', rows);
       });

      });
  // User the connection
  
    }

 */


// Find User by Search
exports.find = (req, res) => {
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM events_jssstu WHERE Event_Name LIKE ? or Venue LIKE ? ', ['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        rows.forEach(item=>{
          item.Date=item.Date.toLocaleDateString();
          console.log(item.Date);
         });
        res.render('admintable', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from events table: \n', rows);
  });
  
  });
}
exports.userv=(req,res)=>{
  res.render('user');
}

exports.form = (req, res) => {
 // const {Event_Name, Event_head_id,Venue,Date,description}=req.body;
  res.render('add-event');
 /* pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    let searchTerm = req.body.search;
    // User the connection
    connection.query('', ['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('add-event', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from events table: \n', rows);
  });
  
  });
  */
}

// Add new user

exports.create = (req, res) => {
 const { Event_Name,Event_head_id, Venue,Date, description,image } = req.body;
 // const { Event_Name,Event_head_id, Venue } = req.body;

 // let searchTerm = req.body.search;
 //const ndate= date(req.body.Date)
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    let searchTerm = req.body.search;
  // User the connection
  connection.query('INSERT INTO events_jssstu SET Event_Name = ?, Event_head_id = ?, Venue = ?,Date=?,description=?,image_url=?', [Event_Name,Event_head_id, Venue,Date,description,image], (err, rows) => {
    if (!err) {
      res.render('add-event', { alert: 'Event added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from events table: \n', rows);
  });
});
}

// exports.create = function(req, res){
//   message = '';
//  if(req.method == "POST"){
//     var post  = req.body;
//     var name= post.Event_name;
//     var id= post.Event_head_id;
//     var venue= post.Venue;
//     var date= post.Date;
//     var des= post.description;
// console.log(req.body);
// if (!req.files)
// return res.status(400).send('No files were uploaded.');
// var file = req.files.uploaded_image;
// var img_name=file.name;
//  if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                              
//             file.mv('../public/images/uploaded_images/'+file.name, function(err) {
                          
//             if (err)
//               return res.status(500).send(err);
//      var sql = "INSERT INTO `events_jssstu`(`Event_name`,`Event_head_id`,`Venue`,`Date`, `description` ,`image`) VALUES ('" + name + "','" + id + "','" + venue + "','" + date + "','" + des + "','" + img_name + "')";
//    var query = db.query(sql, function(err, result) {
//    res.redirect('profile/'+result.Event_ID);
//    });
//  });
//         } else {
//           message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
//           res.render('add-event',{message: message});
//         }
//  } else {
//     res.render('add-event');
//  }
// };



//edit event



exports.edit = (req, res) => {
  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
  connection.query('SELECT * FROM events_jssstu WHERE Event_ID = ?', [req.params.id], (err, rows) => {
    if (!err) {
      rows.forEach(item=>{
        item.Date=item.Date.toLocaleDateString();
      })
      res.render('edit-event', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from event table: \n', rows);
  });
});
}
/*
exports.update = (req, res) => {
  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
  connection.query('SELECT * FROM events_jssstu WHERE Event_ID = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-event', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from event table: \n', rows);
  });
});
}


exports.update = (req, res) => {
  // User the connection
  const { Event_Name,Event_head_id, Venue, Date, description } = req.body;

  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
  connection.query('update events_jssstu  SET Event_Name = ?, Event_head_id = ?, Venue = ?,Date=?,description=? WHERE Event_ID = ?', [Event_Name,Event_head_id, Venue, Date, description,req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-event', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from event table: \n', rows);
  });
});
}
*/

// Update Event
exports.update = (req, res) => {
  const { Event_Name,Event_head_id, Venue,Date,  description,image } = req.body;
  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
  connection.query('UPDATE events_jssstu SET Event_Name = ?, Event_head_id = ?, Venue = ?,Date=?, description = ?,image_url=? WHERE Event_ID = ?', [Event_Name,Event_head_id, Venue,Date,  description,image, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      pool.getConnection((err,connection)=>{
        if(err)throw err;
        console.log('Connected as ID'+connection.threadId);
      connection.query('SELECT * FROM events_jssstu WHERE Event_ID = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          rows.forEach(item=>{
            item.Date=item.Date.toLocaleDateString();
          })
          res.render('edit-event', { rows, alert: `${Event_Name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from event table: \n', rows);
      });
    })
    } else {
      console.log(err);
    }
    console.log('The data from event table: \n', rows);
  });
});
  
}

// Delete Event

exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    console.log(req.params.id)
  connection.query('DELETE FROM events_jssstu WHERE Event_ID = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/admintable');
    } else {
      console.log(err);
   }
   console.log('The data from user table: \n', rows);

   });
  });
};
  // Hide a record
/*
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('Event successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}
*/
// View Users
exports.viewall = (req, res) => {

  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
  connection.query('SELECT * FROM events_jssstu WHERE Event_ID = ?', [req.params.id], (err, rows) => {
    if (!err) {
      rows.forEach(item=>{
        item.Date=item.Date.toLocaleDateString();
      })
      res.render('view-event', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
  });
}
exports.signup=(req,res)=>{
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    res.render("signup")
  })
}
