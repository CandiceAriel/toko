import React, { useState,useEffect } from 'react'
import Barang from './page/Barang';
import Axios from 'axios';
import './style/ListBarang.scss'

const ListBarang = () => {
    const [barang,setBarang]=useState([]);

    //Get data upon accessing localhost
    useEffect(() => {
      Axios.get("http://localhost:3001/barang").then((response) => {
            setBarang(response.data)
        });
    }, [])

    //Delete data from barang based on ID
    const deleteBarang = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
          setBarang(
            barang.filter((barang) => {
              return barang.id !== id;
            })
          );
          alert('deleted')
        });
      };
 
    return (
        <div>
            {barang.map(barang => (
                <div className="wrapper" key={barang.id}>
                <Barang key={barang.id}
                        kodeBarang={barang.kodeBarang} 
                        namaBarang={barang.namaBarang} 
                        harga={barang.harga}
                        stok={barang.stok}
                        qty={barang.qty}/>
                        <button onClick={() => {deleteBarang(barang.id);}} className="button__delete"> Remove </button>
                </div>
            ))}
        </div>
    )
}

export default ListBarang
