import React, { useState,useEffect } from 'react';
import Axios from 'axios'
import '../style/AddBarang.scss'

import NavHeader from '../NavHeader';

const AddBarang = () => {
    const [id] = useState('');
    const [kodeBaranginput,setKodeBaranginput] = useState('');
    const [namaBaranginput,setNamaBaranginput] = useState('');
    const [hargainput,setHargainput] = useState('');
    const [stokinput,setStokinput] = useState('');

    const [barang,setBarang] =  useState([]);

    var dataUser = JSON.parse(localStorage.getItem('dataLogIn'));

    //update Nama value
    const updateKodeBarang = e => {
        setKodeBaranginput(e.target.value);
    }
    
    //update Nama value
    const updateNamaBarang = e => {
        setNamaBaranginput(e.target.value);
    }

    //Update Harga value
    const updateHarga = e => {
        setHargainput(e.target.value);
    }

    //Update Stok value
    const updateStok = e => {
        setStokinput(e.target.value);
    }

    //Add Barang to DB
    const addBarang = () => {
        Axios.post("http://localhost:3001/create/",
        {
            id: id,
            kodeBarang: kodeBaranginput,
            namaBarang: namaBaranginput,
            harga: hargainput,
            stok: parseInt(stokinput),
            stokInput: parseInt(stokinput),
            qty: 0,
        }).then((response) => {
            console.log(response.data);
            alert('Berhasil')
        });
    }

    //Load data upon adding without refreshing page
    useEffect(() => {
        Axios.get("http://localhost:3001/barang").then((response) => {
              setBarang(response.data)
          });
      }, []);
    
    if (dataUser !== null) {
    return (
        <div>
        <NavHeader />
        <div className="barang-add__container">
        <form className="barang-add__form">
            <h5 className="title">Tambah Barang</h5>
            <div className="form__group">
                <label>Kode Barang</label>
                <input type="text"  className="form__input input" value={kodeBaranginput} onChange={updateKodeBarang}/>
            </div>
            <div className="form__group">
                <label>Nama Barang</label>
                <input type="text"  className="form__input input" value={namaBaranginput} onChange={updateNamaBarang}/>
            </div>
            <div className="form__group">
                <label>Harga</label>
                <input type="number"  className="form__input input" value={hargainput} onChange={updateHarga}/>
            </div>
            <div className="form__group">
                <label>Stok</label>
                <input type="number"  className="form__input input" value={stokinput} onChange={updateStok}/>
            </div>
            <div className="form__button">
                <input type="submit" value="Submit" onClick={addBarang} className="button" />
            </div>
        </form>
        <div>
            { barang.map(barang => (
                <div className="wrapper" key={barang.id}>
                <table className="barang-add__table">
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
        </div>
    );
    } else if ( dataUser === null) {
        return (
            <div>
                <NavHeader />
                <h1 className="barang-add__warning-text">Not Authorized</h1>
            </div>
        )
    }
}

export default AddBarang;