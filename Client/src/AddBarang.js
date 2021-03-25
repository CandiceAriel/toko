import React, {useState, useContext} from 'react';
import ListBarang from './ListBarang'
import NavHeader from './NavHeader';
import Axios from 'axios'
import './style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [nama,setNama] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');
    const [tglMasuk,setMasuk] = useState('');
    const [tglKeluar,setKeluar] = useState('');

    const [barang,setBarang] = useState([])


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

    const addBarang = () => {
        Axios.post("http://localhost:3001/create",
        {
            id: id,
            nama: nama,
            harga: harga,
            stok: stok,
            tglMasuk: tglMasuk,
            tglKeluar: tglKeluar,
            qty: 0,
        }).then(() => {
        alert("Good");
    });
        {/*e.preventDefault(); 
        const existingIndex = barang.find((barang) => barang.id === id);

        if(existingIndex){
            existingIndex.stok = parseInt(existingIndex.stok)+ parseInt(stok)
            setBarang(prevBarang => [...prevBarang,{id: id,tglMasuk: tglMasuk,tglKeluar: tglKeluar,nama: nama,harga: harga, stok: existingIndex.stok}])
        } else setBarang(prevBarang => [...prevBarang,{id: id,tglMasuk: tglMasuk,tglKeluar: tglKeluar,nama: nama,harga: harga, stok: stok}]) */}
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
        <ListBarang />
        </div>
    );
}

export default AddBarang;