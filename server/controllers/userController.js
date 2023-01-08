const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 100,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME

});


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
exports.register=(req,res)=>{
  console.log(req.body);
  res.send("Sign Up succeSsfull!");
}
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

 


// Find User by Search
exports.find = (req, res) => {
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM events_jssstu WHERE Event_Name LIKE ? or Venue LIKE ? ', ['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('home', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from events table: \n', rows);
  });
  
  });
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
 const { Event_Name,Event_head_id, Venue,Date, description } = req.body;
 // const { Event_Name,Event_head_id, Venue } = req.body;

 // let searchTerm = req.body.search;
 //const ndate= date(req.body.Date)
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    let searchTerm = req.body.search;
  // User the connection
  connection.query('INSERT INTO events_jssstu SET Event_Name = ?, Event_head_id = ?, Venue = ?,Date=?,description=?', [Event_Name,Event_head_id, Venue,Date,description], (err, rows) => {
    if (!err) {
      res.render('add-event', { alert: 'Event added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from events table: \n', rows);
  });
});
}


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
  const { Event_Name,Event_head_id, Venue,Date,  description  } = req.body;
  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
  connection.query('UPDATE events_jssstu SET Event_Name = ?, Event_head_id = ?, Venue = ?,Date=?, description = ? WHERE Event_ID = ?', [Event_Name,Event_head_id, Venue,Date,  description, req.params.id], (err, rows) => {

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
/*
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('Connected as ID'+connection.threadId);
    console.log(req.params.id)
  connection.query('DELETE FROM events_jssstu WHERE Event_ID = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/');
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
