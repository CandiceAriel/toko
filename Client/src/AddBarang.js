import React, {useState} from 'react';
import ListBarang from './ListBarang'
import Axios from 'axios'
import './style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [nama,setNama] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');

    //update ID value
    const updateID = e => {
        setID(e.target.value);
    }
    
    //update Nama value
    const updateNama = e => {
        setNama(e.target.value);
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
            nama: nama,
            harga: harga,
            stok: stok,
            qty: 0,
        }).then(() => {
        alert("Good");
    });
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
            <div className="btn__submit">
                <input type="submit" value="Submit" onClick={addBarang} className="btn" />
            </div>
        </form>
        <ListBarang />
        </div>
    );
}

export default AddBarang;