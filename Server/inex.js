const mysql = require('mysql');
const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());


const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "Toko"
});

//Connect to DB
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

//Get data Barang from Barang table
app.get('/barang', function (req, res) {
    con.query('SELECT * FROM Barang', (error, rows,field)  => {
        if (error) throw error;
        return res.send(rows);
    });
});

//Add data to tabel Barang
app.post('/create', (req,res) => {
  const id = req.body.id;
  const nama = req.body.nama;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const qty = req.body.qty;

  con.query('INSERT INTO Barang (id, nama,harga,stok,qty) VALUES (?,?,?,?,?)',
   [id,nama,harga,stok,qty],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        console.log(result);
        res.send("Worked");
      }
    }
  );
});

//Delete data from Table Barang
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM Barang WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update data on table Barang
app.put("/update", (req, res) => {
  const id = req.body.id;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const qty = req.body.qty;
  con.query(
    "UPDATE Barang SET harga = ?,stok = ?,qty=? WHERE id = ?",
    [harga,stok, qty, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Add data to Cart table
app.post('/createCart', (req,res) => {
  const id = req.body.id;
  const nama = req.body.nama;
  const harga = req.body.harga;
  const qty = req.body.qty;

  con.query('INSERT INTO Cart (id,nama,harga,qty, harga * qty AS total) VALUES (?,?,?,?,?)',
   [id,nama,harga,qty,total],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        res.send("Worked");
      }
    }
  );
});

//delete data from Cart table
app.delete("/deleteCart/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM Cart WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/cart', function (req, res) {
  con.query('SELECT * FROM Cart', (error, rows,field)  => {
      if (error) throw error;
      return res.send(rows);
  });
});

//Add data to User table
app.post('/register', (req,res) => {
  const userID = req.body.userID;
  const nama = req.body.nama;
  const noHP = req.body.noHP;
  const email = req.body.email;
  const password = req.body.password;

  con.query('INSERT INTO User (userID,nama,noHP,email,password) VALUES (?,?,?,?,?)',
   [userID,nama,noHP,email,password],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        res.send("Worked");
      }
    }
  );
});

app.get('/user', function (req, res) {
  con.query('SELECT * FROM User', (error, rows,field)  => {
      if (error) throw error;
      return res.send(rows);
  });
});

//Add Sign In data from Sign in form
app.post('/SignIn', function(req,res) {
  const email = req.body.email;
  const password = req.body.password;

  con.query('SELECT * FROM User WHERE email = ? AND password = ?', 
      [email,password], 
      (err,result) => {
        if(err){
          res.send({err : err});
        }
          if (result.length > 0){
            res.send(result);
          } else {
            res.send ({message : 'Wrong password or email'})
          }
      }
    );
});

app.listen(3001, () => {
  console.log("Connected!");
});