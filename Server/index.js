const mysql = require('mysql');
const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "Toko",
  multipleStatements: true
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
  const kodeBarang = req.body.kodeBarang;
  const namaBarang = req.body.namaBarang;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const qty = req.body.qty;

  con.query('INSERT INTO Barang (kodeBarang, namaBarang,harga,stok,qty) VALUES (?,?,?,?,?)',
   [kodeBarang,namaBarang,harga,stok,qty],
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
  const kodeBarang = req.body.kodeBarang;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const qty = req.body.qty;
  con.query(
    "UPDATE Barang SET harga = ?,stok = ?,qty=? WHERE kodeBarang = ?",
    [harga,stok, qty, kodeBarang],
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
  const userID = req.body.userID;
  const id = req.body.id;
  const kodeBarang = req.body.kodeBarang;
  const namaBarang = req.body.namaBarang;
  const harga = req.body.harga;
  const qty = req.body.qty;
  const total = req.body.total;

  con.query('INSERT INTO Cart (userID,id,kodeBarang,namaBarang,harga,qty,total) VALUES (?,?,?,?,?,?,?)',
   [userID,id,kodeBarang,namaBarang,harga,qty,total],
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

  con.query("DELETE FROM Cart WHERE id = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add data to User table
app.post('/register', (req,res) => {
  const userID = req.body.userID;
  const nama = req.body.nama;
  const noHP = req.body.noHP;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    }

  con.query('INSERT INTO User (userID,nama,noHP,email,password) VALUES (?,?,?,?,?)',
   [userID,nama,noHP,email,hash],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        res.send("Worked");
      }
    }
  );
  });
});

app.get('/user', function (req, res) {
  const userID = req.body.email;

  con.query('SELECT userID,email,nama,noHP FROM User',
    (error, rows,field)  => {
      if (error) throw error;
      return res.send(rows);
  });
});

//Compare Sign In input from for with DB 
app.post('/SignIn', function(req,res) {
  const email = req.body.email;
  const password = req.body.password;

  con.query('SELECT * FROM User WHERE email = ?', 
      email, 
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              res.send(result);
            } else  {
              res.send({ message: "Incorrect password!" });
            }
          });
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
});

//retrieve Cart based on UserID in Local Storage
app.post('/retrieveCart', function(req,res) {
  const userID = req.body.userID;

  con.query('SELECT * FROM Cart WHERE userID = ?', 
      userID, 
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
              res.send(result);
        } else {
          res.send({ message: "User doesn't exist" });
        }
      }
    );
});

app.listen(3001, () => {
  console.log("Connected!");
});