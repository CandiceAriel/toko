import React, {useState,useContext} from 'react'
import './style/Barang.scss'

const Barang = ({id,tglMasuk,tglKeluar,nama, harga,stok}) => {
    const [count,setCount] = useState(0);
    const [stokBaru,setStok] = useState(stok);
    const [hargaBaru, setHarga] = useState(harga);
    const [counter,setCounter] = useState(0);

    const [cart,setCart] = useState([]);

    const addCart = e => {
        setCart(current => [...current,nama,count])
        alert (count)
    }

    const kurangiStok =() => {
       if(stokBaru == 0 ){
            setCount(count + 0)
            alert ("Stok Kurang")
        } else { 
            setCount(count+1)
            setStok(stokBaru - 1)
        }
    }

    const tambahStok =() => {
        setCount(count-1)
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

    const updateHarga = e => {
        setHarga(e.target.value);
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
                        <td><button onClick={kurangiStok} className="button__tambahQty">+</button>{count}<button onClick={tambahStok} className="button__kurangQty">-</button></td>
                        <td>{count * hargaBaru}</td>
                        <td><button onClick={addCart} className="button__remove">Add</button></td> 
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Barang
