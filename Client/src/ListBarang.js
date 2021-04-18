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
            <div className="list-barang_container">
            <h1 className="list-barang_title">Daftar Barang</h1>
            <div className="list-barang_wrapper">
            <table className="list-barang_table">
              <thead>
                <tr>
                    <th align="center" className="list-barang_table table_head">Kode Barang</th>
                    <th align="center" className="list-barang_table table_head">Nama Barang</th>
                    <th align="center" className="list-barang_table table_head">Harga</th> 
                    <th align="left" className="list-barang_table table_head">Stok Barang</th>
                    <th align="left" className="list-barang_table table_head">Jumlah Barang</th>
                    <th className="list-barang_table table_head"><Link to="/AddBarang" className="link_tambahbarang">+</Link></th>
                </tr>
              </thead>
              </table>
              <div className="list-barang_item_container">
              {barang.map(barang => (
                      <div className="wrapper" key={barang.id}>
                        <Barang key={barang.id}
                        kodeBarang={barang.kodeBarang} 
                        namaBarang={barang.namaBarang} 
                        harga={barang.harga}
                        stok={barang.stok}
                        qty={barang.qty}/>
                      </div>
                  ))}
              </div>  
            </div>
            </div>
      </div>
    )
}

export default ListBarang
