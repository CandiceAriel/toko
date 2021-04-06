import React, { useState,useEffect } from 'react';
import Axios from 'axios'
import '../style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [kodeBarang,setKodeBarang] = useState('');
    const [namaBarang,setNamaBarang] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');

    const [barang,setBarang] =  useState([]);

    //update Nama value
    const updateKodeBarang = e => {
        setKodeBarang(e.target.value);
    }
    
    //update Nama value
    const updateNamaBarang = e => {
        setNamaBarang(e.target.value);
    }

    //Update Harga value
    const updateHarga = e => {
        setHarga(e.target.value);
    }

    //Update Stok value
    const updateStok = e => {
        setStok(e.target.value);
    }

    //Add Barang to DB
    const addBarang = () => {
        Axios.post("http://localhost:3001/create",
        {
            id: id,
            kodeBarang: kodeBarang,
            namaBarang: namaBarang,
            harga: harga,
            stok: parseInt(stok),
            qty: 0,
        }).then((response) => {
            console.log(response.data);
        });
    }

    //Load data upon adding without refreshing page
    useEffect(() => {
        Axios.get("http://localhost:3001/barang").then((response) => {
              setBarang(response.data)
          });
      }, []);

    return (
        <div>
        <form className="formAddBarang" onSubmit={addBarang}>
            <h1>Tambah Barang</h1>
            <div>
                <label>Kode Barang</label>
                <input type="text"  className="input__Kode" value={kodeBarang} onChange={updateKodeBarang}/>
            </div>
            <div>
                <label>Nama Barang</label>
                <input type="text"  className="input__Nama" value={namaBarang} onChange={updateNamaBarang}/>
            </div>
            <div>
                <label>Harga</label>
                <input type="number"  className="input__Harga" value={harga} onChange={updateHarga}/>
            </div>
            <div>
                <label>Stok</label>
                <input type="number"  className="input__Stok" value={stok} onChange={updateStok}/>
            </div>
            <div className="btn__submit">
                <input type="submit" value="Submit" onClick={addBarang} className="btn" />
            </div>
        </form>

        <div>
            { barang.map(barang => (
                <div className="wrapper" key={barang.id}>
                <table className="table">
                    <tbody> 
                        <tr>
                        <td>{barang.kodeBarang}</td>
                        <td>{barang.namaBarang}</td>
                        <td>{barang.harga}</td>
                        <td>{barang.stok}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            ))}
        </div>
        </div>
    );
}

export default AddBarang;