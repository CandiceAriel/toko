import React, {useState,useContext} from 'react'
import Axios from 'axios';
import './style/Barang.scss'

const Barang = ({id,tglMasuk,tglKeluar,nama, harga,stok}) => {
    const [qty,setQty] = useState(0);
    const [stokBaru,setStok] = useState(stok);
    const [hargaBaru, setHarga] = useState(harga);
    const [counter,setCounter] = useState(0);

    const [cart,setCart] = useState([]);

    const [barang,setBarang] = useState([])

    const kurangiStok =() => {
       if(stokBaru == 0 ){
            setQty(qty + 0)
            alert ("Stok Kurang")
        } else { 
            setQty(qty+1)
            setStok(stokBaru - 1)
        }
    }

    const tambahStok =() => {
        setQty(qty-1)
        setStok(stokBaru +1)
    }

    const addStok =() => {
        setCounter(counter-1)
        setStok(stokBaru +1)
    }

    const minusStok =() => {
        setCounter(counter+1)
        setStok(stokBaru -1)
    }

    const updateHarga = (e) => {
        setHarga(e.target.value);
    }

    const updateQty = (e) => {
        setHarga(e.target.value);
    }

    const updateBarang = (id) => {
        Axios.put("http://localhost:3001/update", { harga: hargaBaru, stok: stokBaru , qty: qty , id: id }).then(
          (response) => {
            setBarang(barang)
          }
        );
    };

    const addCart = (id) => {
        alert(id)
        Axios.post("http://localhost:3001/createCart",
        {
            id: id,
            nama: nama,
            harga: harga,
            stok: stok,
            qty: 0,
        }).then(() => {
        alert("Good");
    });
    }

    return (
        <div className="container">
            <div>
                <table className="table">
                    <tbody>
                        <td>{id}</td>
                        <td>{tglMasuk}</td>
                        <td>{tglKeluar}</td>
                        <td>{nama}</td>
                        <td><input type="number" className="input" value={hargaBaru} onChange={updateHarga}></input></td> 
                        <td><button onClick={addStok} className="button__tambah">+</button>{stokBaru}<button onClick={minusStok} className="button__kurang">-</button></td>
                        <td><button onClick={kurangiStok} className="button__tambahQty">+</button>{qty}<button onClick={tambahStok} className="button__kurangQty">-</button></td>
                        <td><button onClick={() => {updateBarang(id);}}className="button__update"> Update </button></td>
                        <td><button onClick={() => {addCart(id);}}className="button__update"> Add </button></td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Barang
