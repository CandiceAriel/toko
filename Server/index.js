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
app.post('/create/', (req,res) => {
  const id = req.body.id;
  const kodeBarang = req.body.kodeBarang;
  const namaBarang = req.body.namaBarang;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const stokInput = req.body.stokInput;
  const qty = req.body.qty;
  req.setTimeout( 1000 * 60 * 10 ); 

  con.query('INSERT INTO Barang (kodeBarang, namaBarang,harga,stok,stokInput,qty) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE stokInput = VALUES(stokInput), stok = stok + stokInput ',
   [kodeBarang,namaBarang,harga,stok,stokInput,qty],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        setTimeout( function() {
          console.log(result);
        res.send("Worked");
      }, 10000 );
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
app.post('/createCartDetail/', (req,res) => {
  const userID = req.body.userID;
  const id = req.body.id;
  const cartID = req.body.cartID;
  const kodeBarang = req.body.kodeBarang;
  const namaBarang = req.body.namaBarang;
  const harga = req.body.harga;
  const qty = req.body.qty;
  const qtyinput = req.body.qtyinput;
  const total = req.body.total;

  con.query('INSERT INTO Cart_detail (userID,id,cartID,kodeBarang,namaBarang,harga,qty,qtyinput,total) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE qtyinput = VALUES(qtyinput), qty = qty+qtyinput',
   [userID,id,cartID,kodeBarang,namaBarang,harga,qty,qtyinput,total],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        res.send(result.data);
      }
    }
  );
});

//Get data Barang from Barang table
app.get('/cart', function (req, res) {
  con.query('SELECT * FROM Cart', (error, rows,field)  => {
      if (error) throw error;
      return res.send(rows);
  });
});

app.post('/createCart/', (req,res) => {
  const userID = req.body.userID;
  const cartID = req.body.cartID;

  con.query('INSERT INTO Cart (userID,cartID) VALUES (?,?) ON DUPLICATE KEY UPDATE cartID = VALUES(cartID)',
   [userID,cartID],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
        res.send(result.data);
      }
    }
  );
});

//delete data FROM Cart_detail table
app.delete("/deleteCart/:id", (req, res) => {
  const id = req.params.id;

  con.query("DELETE FROM Cart_detail WHERE id = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update data on table Barang
app.put("/updateCart", (req, res) => {
  const kodeBarang = req.body.kodeBarang;
  const total = req.body.total;
  const qty = req.body.qty;
  con.query(
    "UPDATE Cart SET qty=?,total =? WHERE kodeBarang = ?",
    [qty, total, kodeBarang],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Update data on table Barang
app.put("/updatebarang", (req, res) => {
  const kodeBarang = req.body.kodeBarang;

  con.query(
    "UPDATE Barang INNER JOIN Cart_detail ON Barang.kodeBarang = Cart_detail.kodeBarang SET Barang.stok= Barang.stok+ Cart_detail.qty WHERE Barang.kodeBarang = ?",
    [kodeBarang],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Add data to User table
app.post('/register/', (req,res) => {
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

  con.query('SELECT cartID FROM Cart WHERE userID = ?', 
      userID, 
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
              res.send(result);
        } else {
          res.send({ message: "Cart is empty" });
        }
      }
    );
});

//retrieve Cart based on UserID in Local Storage
app.post('/totalbelanja', function(req,res) {
  const userID = req.body.userID;
  const cartID = req.body.cartID;

  con.query('SELECT SUM(total) AS totalorder FROM Cart_detail WHERE userID = ? AND cartID = ?', 
      [userID, cartID],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
              res.send(result);
        } else {
          res.send({ message: "Cart is empty" });
        }
      }
    );
});

//retrieve Cart based on UserID in Local Storage
app.post('/retrieveCartDetil', function(req,res) {
  const userID = req.body.userID;

  con.query('SELECT * FROM Cart_detail WHERE userID = ?', 
      userID, 
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
  
        if (result.length > 0) {
              res.send(result);
        } else {
          res.send({ message: "Cart is empty" });
        }
      }
    );
});

app.listen(3001, () => {
  console.log("Connected!");
});