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

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});


app.get('/barang', function (req, res) {
    con.query('SELECT * FROM Barang', (error, rows,field)  => {
        if (error) throw error;
        return res.send(rows);
    });
});

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

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM Barang WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      alert('Worked');
      res.send(result);
    }
  });
});

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

app.listen(3001, () => {
  console.log("Connected!");
});