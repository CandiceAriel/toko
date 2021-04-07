import React, {useState} from 'react'
import Axios from 'axios';
import '../style/Barang.scss'

const Barang = ({id, kodeBarang,namaBarang, harga,stok}) => {
    const [qty,setQty] = useState(0);
    const [stokBaru,setStokBaru] = useState(stok);
    const [hargaBaru, setHargaBaru] = useState(harga);

    const [barang,setBarang] = useState([])

    //Kurangi stok based on qty for counter button
    const kurangiStok =() => {
       if(stokBaru === 0 ){
            setQty(qty + 0)
            alert ("Stok Kurang")
        } else { 
            setQty(qty+1)
            setStokBaru(stokBaru - 1)
        }
    }

    //Tambah stok based on qty for counter button
    const tambahStok =() => {
        setQty(qty-1)
        setStokBaru(stokBaru +1)
    }

    //Tambah stok based on qty for stok +  button
    const addStok =() => {
        setStokBaru(stokBaru +1)
    }

    //Kurangi stok based on qty for stok -  button
    const minusStok =() => {
        setStokBaru(stokBaru -1)
    }

    //Update Harga value
    const updateHarga = (e) => {
        setHargaBaru(e.target.value);
    }

    //Update Barang to DB based on new value
    const updateBarang = (kodeBarang) => {
        Axios.put("http://localhost:3001/update", { harga: hargaBaru, stok: stokBaru , qty: qty , kodeBarang: kodeBarang }).then(
          (response) => {
            setBarang(barang.map((barang) => {
                return barang.kodeBarang === kodeBarang ? {kodeBarang: kodeBarang,nama: namaBarang, harga: hargaBaru, stok:stokBaru, qty: qty } : barang
            }))
          }
        );
    };

    //Add to Cart
    const addCart = (id) => {
        var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
        if(localStorage.getItem('dataLogIn') !== null){
            Axios.post("http://localhost:3001/createCart",
        {
            userID: dataUser[0].userID,
            id: id,
            kodeBarang: kodeBarang,
            namaBarang: namaBarang,
            harga: hargaBaru,
            stok: stokBaru,
            qty: qty,
            total : hargaBaru * qty,
        }).then(() => {
            alert("Good");
            Axios.put("http://localhost:3001/update", { harga: hargaBaru, stok: stokBaru , qty: qty , id: id }).then(
                (response) => {
                  setBarang(barang.map((barang) => {
                      return barang.id === id ? {id: id,kodeBarang: kodeBarang,namaBarang: namaBarang, harga: hargaBaru, stok:stokBaru, qty: qty } : barang
                  }))
                }
              );
         });
        } else {
            alert ('You must log in')
        }
    }

    return (
        <div className="content">
        <div>
            <table className="table">
                    <tbody>
                        <tr>
                        <td>{kodeBarang}</td>
                        <td>{namaBarang}</td>
                        <td><input type="number" className="input" value={hargaBaru} onChange={updateHarga}></input></td> 
                        <td><button onClick={addStok} className="button__tambah">+</button>{stokBaru}<button onClick={minusStok} className="button__kurang">-</button></td>
                        <td><button onClick={kurangiStok} className="button__tambahQty">+</button>{qty}<button onClick={tambahStok} className="button__kurangQty">-</button></td>
                        <td><button onClick={() => {updateBarang(kodeBarang);}} className="button__editData"> Update </button></td>
                        <td><button onClick={() => {addCart(id);}} className="button__addCart"> Add </button></td>
                        </tr>
                    </tbody>
            </table>
        </div>
        </div>
    )
}

export default Barang
