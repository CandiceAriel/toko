import React, {useState, useContext} from 'react';
import {BarangContext} from './BarangContext'
import './style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [nama,setNama] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');
    const [tglMasuk,setMasuk] = useState('');
    const [tglKeluar,setKeluar] = useState('');
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
    const updateMasuk = e => {
        setMasuk(Date().toLocaleString());
    }
    const updateKeluar = e => {
        setKeluar(e.target.value);
    }

    const addBarang = e => {
        e.preventDefault(); 
        const ids = barang.map(({id}) => id),
        id = Math.max(...ids) + 1

        setBarang(prevBarang => [...prevBarang,{id: id,nama: nama,harga: harga, stok: stok}])
    }


    return (
        <div>
        <form className="form" onSubmit={addBarang}>
            <h1>Tambah Barang</h1>
            <div>
                <label>ID<input type="text"  className="inputID" value={id} onChange={updateID}/></label>
            </div>
            <div>
                <label>Nama<input type="text"  className="inputNama" value={nama} onChange={updateNama}/></label>
            </div>
            <div>
                <label>Harga<input type="number"  className="inputHarga" value={harga} onChange={updateHarga}/></label>
            </div>
            <div>
                <label>Stok<input typw="number"  className="inputStok" value={stok} onChange={updateStok}/></label><br></br>
            </div>
            <div className="inputMasuk">
                <label>Tanggal Masuk<input type="text" value={new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()} onChange={updateMasuk}/></label><br></br>
            </div>
            <div className="inputKeluar"><label>Tanggal Keluar<input type="text" name="stok" value={tglKeluar} onChange={updateKeluar}/></label><br></br>
                <input type="submit" value="Submit" className="btn" />
            </div>
        </form>
        </div>
    );
}

export default AddBarang;
