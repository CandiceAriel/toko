import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import '../style/Barang.scss'

import { FaPenAlt } from 'react-icons/fa'

const Barang = ({id, cartID,kodeBarang,namaBarang, harga,stok}) => {
    const [qty,setQty] = useState(0);
    const [stokBaru,setStokBaru] = useState(stok);
    const [hargaBaru, setHargaBaru] = useState(harga);

    const [barang,setBarang] = useState([])

    //Kurangi stok based on Qty for counter button
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
            alert('Data Updated')
          }
        );
    };

    //Add to Cart
    const addCartDetail = (id) => {
        var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));
        var datacart = JSON.parse(localStorage.getItem('datacart'));

        if(dataUser !== null && datacart !== null){
            Axios.post("http://localhost:3001/createCartDetail",
         {
            userID: dataUser[0].userID,
            id: id,
            cartID: datacart[0].cartID,
            kodeBarang: kodeBarang,
            namaBarang: namaBarang,
            harga: hargaBaru,
            stok: stokBaru,
            qty: qty,
            qtyinput: qty,
            total : hargaBaru * qty,
         }).then((response) => {
            alert("Good");
            {updateBarang(kodeBarang);}
            setQty(0)
         });

         Axios.post("http://localhost:3001/retrieveCartDetil",
          {
            userID: dataUser[0].userID
          }).then((response) => {
          if(response.data.message ){
            console.log(response.data.message)
          }else {
            localStorage.setItem('usercart', JSON.stringify(response.data));
          }
        });
        } else if (dataUser === null) {
            alert ('You must log in')
        }
    }

    return (
        <div className="barang__container">
            <table className="barang__table">
                    <tbody>
                        <tr>
                        <td className="barang__table table__item" width="100px">{kodeBarang}</td>
                        <td className="barang__table table__item" width="100px">{namaBarang}</td>
                        <td className="barang__table table__item" width="50px"><input type="number" className="input-harga" value={hargaBaru} onChange={updateHarga}></input><button className="btn__update" onClick={() => {updateBarang(kodeBarang);}}><FaPenAlt /></button></td> 
                        <td className="barang__table table__item" width="50px"><button onClick={addStok} className="btn__tambah">+</button>{stokBaru}<button onClick={minusStok} className="btn__kurang">-</button></td>
                        <td className="barang__table table__item" width="50px"><button onClick={kurangiStok} className="btn__tambah">+</button>{qty}<button onClick={tambahStok} className="btn__kurang">-</button></td>
                        <td className="barang__table table__item__addtocart" width="200px"><button onClick={() => {addCartDetail(id);}} className="button"> BELI SEKARANG </button></td>
                        </tr>
                    </tbody>
            </table>
        </div>
    )
}

export default Barang
