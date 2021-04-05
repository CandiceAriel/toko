import React, { useState,useEffect } from 'react';
import Axios from 'axios'
import '../style/AddBarang.scss'

const AddBarang = () => {
    const [id,setID] = useState('');
    const [nama,setNama] = useState('');
    const [harga,setHarga] = useState('');
    const [stok,setStok] = useState('');

    const [barang,setBarang] =  useState([]);


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
                <label>ID</label>
                <input type="text"  className="inputID" value={id} onChange={updateID}/>
            </div>
            <div>
                <label>Nama</label>
                <input type="text"  className="inputNama" value={nama} onChange={updateNama}/>
            </div>
            <div>
                <label>Harga</label>
                <input type="number"  className="inputHarga" value={harga} onChange={updateHarga}/>
            </div>
            <div>
                <label>Stok</label>
                <input type="number"  className="inputStok" value={stok} onChange={updateStok}/>
            </div>
            <div className="btn__submit">
                <input type="submit" value="Submit" onClick={addBarang} className="btn" />
            </div>
        </form>

        <div>
            { barang.map(barang => (
                <div className="wrapperBaru" key={barang.id}>
                <table className="table" key={barang.id}>
                    <tbody key={barang.id}> 
                        <tr key={barang.id}>
                        <td>{barang.id}</td>
                        <td>{barang.nama}</td>
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