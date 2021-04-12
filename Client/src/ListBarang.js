import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Barang from './page/Barang';
import Axios from 'axios';
import './style/ListBarang.scss'
import NavHeader from './NavHeader';

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
            <NavHeader />
            <div className="container">
            <div className="list-barang__wrapper">
            <table className="list-barang__table">
              <thead>
                <tr>
                    <th align="center" width="115px">Kode Barang</th>
                    <th align="center" width="115px">Nama Barang</th>
                    <th align="center" width="115px">Harga</th> 
                    <th align="center" width="115px">Stok Barang</th>
                    <th align="left" width="115px">Jumlah Barang</th>
                    <th align="left" width="115px"></th>
                    <th align="left" width="115px"></th>
                    <th align="left" width="50px"><Link to="/AddBarang" className="link__barang">Add</Link></th>
                </tr>
              </thead>
              </table>
                {barang.map(barang => (
                      <div className="wrapper" key={barang.id}>
                        <Barang key={barang.id}
                        kodeBarang={barang.kodeBarang} 
                        namaBarang={barang.namaBarang} 
                        harga={barang.harga}
                        stok={barang.stok}
                        qty={barang.qty}/>
                        <button onClick={() => {deleteBarang(barang.id);}} className="list-barang__btn__delete"> Remove </button>
                      </div>
                  ))}
            
            </div>
            </div>
      </div>
    )
}

export default ListBarang
