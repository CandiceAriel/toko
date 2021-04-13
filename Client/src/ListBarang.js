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
            <div className="list-barang__container">
            <div className="list-barang__wrapper">
            <table className="list-barang__table">
              <thead>
                <tr>
                    <th align="center" width="50px">Kode Barang</th>
                    <th align="center" width="50px">Nama Barang</th>
                    <th align="center" width="50px">Harga</th> 
                    <th align="center" width="50px">Stok Barang</th>
                    <th align="center" width="50px">Jumlah Barang</th>
                    <th align="center" width="50px"><Link to="/AddBarang" className="link__barang">Add</Link></th>
                </tr>
              </thead>
              </table>
              <div className="list-barang__item__container">
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
