import React, {useState, useContext} from 'react';
import {BarangContext} from './BarangContext'
import './style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [nama,setNama] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');
    const [newStok, setStokBaru] = useState('');
    const [tglMasuk,setMasuk] = useState('');
    const [tglKeluar,setKeluar] = useState('');
    const [count,setCount] = useState(0);

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
        setMasuk(e.target.value);
    }
    const updateKeluar = e => {
        setKeluar(e.target.value);
    }

    const addBarang = e => {
        e.preventDefault(); 
        const existingIndex = barang.findIndex((barang) => barang.id === id);

        if(existingIndex >= 0){
            const sama = barang.findIndex((barang) => barang.id === id)
            setStok(sama.stok)
            alert (stok)
        } else setBarang(prevBarang => [...prevBarang,{id: id,tglMasuk: tglMasuk,tglKeluar: tglKeluar,nama: nama,harga: harga, stok: stok}])
    }

    const tambahStok =() => {
        setCount(count+1)
        setStok(stok +1)
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
                <label>Stok<input type="number"  className="inputStok" value={stok} onChange={updateStok}/></label><br></br>
            </div>
            <div className="inputMasuk">
                <label>Tanggal Masuk<input type="text" value={tglMasuk} onChange={updateMasuk}/></label><br></br>
            </div>
            <div className="inputKeluar"><label>Tanggal Keluar<input type="text" name="stok" value={tglKeluar} onChange={updateKeluar}/></label><br></br>
                <input type="submit" value="Submit" className="btn" />
            </div>
        </form>
        </div>
    );
}

export default AddBarang;
