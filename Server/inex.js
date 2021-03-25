const mysql = require('mysql');
const express = require("express");
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json());


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
  const tglMasuk = req.body.tglMasuk;
  const tglKeluar = req.body.tglKeluar;
  const nama = req.body.nama;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const qty = req.body.qty;

  con.query('INSERT INTO Barang (id,tglMasuk,tglKeluar,nama,harga,stok,qty) VALUES (?,?,?,?,?,?,?)',
   [id,tglMasuk,tglKeluar,nama,harga,stok,qty],
    (err,result) => {
      if(err) {
        console.log(err);
      }else {
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

  con.query('INSERT INTO Cart (id,nama,harga,qty) VALUES (?,?,?,?)',
   [id,nama,harga,qty],
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

app.listen(3001, () => {
  console.log("Connected!");
});