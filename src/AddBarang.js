import React, {useState, useContext} from 'react';
import {BarangContext} from './BarangContext'
import './style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [nama,setNama] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');
    const [barang,setBarang] = useContext(BarangContext)

    const updateID = e => {
        setID(e.target.value);
    }
    
    const updateNama = e => {
        setNama(e.target.value);
    }

    const updateHarga = e => {
        setHarga(e.target.value);
    }

    const updateStok = e => {
        setStok(e.target.value);
    }

    const addBarang = e => {
        e.preventDefault(); 
        setBarang(prevBarang => [...prevBarang,{id: id,nama: nama,harga: harga, stok: stok}])

    }

    return (
        <div className="wrapper">
        <form className="form" onSubmit={addBarang}>
            <label>ID:<input type="text" name="id" value={id} onChange={updateID}/></label><br></br>
            <label>Nama Barang<input type="text" name="nama" value={nama} onChange={updateNama}/></label><br></br>
            <label>Harga<input type="number" name="harga" value={harga} onChange={updateHarga}/></label><br></br>
            <label>Stok<input typw="number" name="stok" value={stok} onChange={updateStok}/></label><br></br>
            <input type="submit" value="Submit" className="btn" />
        </form>
        </div>
    );
}

export default AddBarang;
