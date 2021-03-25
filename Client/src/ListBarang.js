import React, { useContext, useState } from 'react'
import Barang from './Barang';
import Axios from 'axios';
import './style/ListBarang.scss'

const ListBarang = () => {
    const [barang,setBarang]=useState([]);

    const getBarang = () => {
        Axios.get("http://localhost:3001/barang").then((response) => {
            setBarang(response.data)
        });
    };

    const deleteBarang = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
          setBarang(
            barang.filter((barang) => {
              return barang.id != id;
            })
          );
        });
      };
 
    return (
        <div>
            <div>
                <span>
                <button onClick={getBarang} className="button__show">Show Barang</button>
                </span>
            </div>
            {barang.map(barang => (
                <div className="content">
                <Barang id={barang.id}
                        tglMasuk = {barang.tglMasuk}
                        tglKeluar={barang.tglKeluar}
                        nama={barang.nama} 
                        harga={barang.harga}
                        stok={barang.stok}
                        qty={barang.qty}/>
                        <button onClick={() => {deleteBarang(barang.id);}}className="button__delete"> Remove </button>
                </div>
            ))}
        </div>
    )
}

export default ListBarang
