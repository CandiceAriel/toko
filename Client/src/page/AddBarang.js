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
    
    if (dataUser !== null) {
    return (
        <div>
        <NavHeader />
        <div className="barang-add_container">
        <form className="barang-add_form">
            <div className="signup_form_title">
                <h5 className="signup_form_title_text">Tambah Barang</h5>
            </div>
            <div className="barang-add_form_input_group">
                <label>Kode Barang</label>
                <input type="text"  className="barang-add_forminput__kode" value={kodeBaranginput} onChange={updateKodeBarang}/>
            </div>
            <div className="barang-add_form_input_group">
                <label>Nama Barang</label>
                <input type="text"  className="barang-add_form_input_nama" value={namaBaranginput} onChange={updateNamaBarang}/>
            </div>
            <div className="barang-add_form_input_group">
                <label>Harga</label>
                <input type="number"  className="barang-add_form_input_harga" value={hargainput} onChange={updateHarga}/>
            </div>
            <div className="barang-add_form_input_group">
                <label>Stok</label>
                <input type="number"  className="barang-add_form_input_stok" value={stokinput} onChange={updateStok}/>
            </div>
            <div className="barang-add_form_btn">
                <input type="submit" value="Submit" onClick={addBarang} className="barang-add_form_btn_submit" />
            </div>
        </form>
        <div>
            { barang.map(barang => (
                <div className="wrapper" key={barang.id}>
                <table className="barang-add_table">
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
                <h1 className="barang-add_warning-text">Not Authorized</h1>
            </div>
        )
    }
}

export default AddBarang;