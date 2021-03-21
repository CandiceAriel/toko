import React, { useState,useContext } from 'react'
import {BarangContext} from './BarangContext'
import Barang from './Barang'

const ListBarang = () => {
    const [barang,setBarang]=useContext(BarangContext);
    
    return (
        <div>
            {barang.map(barang => (
                <Barang key ={barang.id}
                        id={barang.id}
                        tglMasuk = {barang.tglMasuk}
                        tglKeluar={barang.tglKeluar}
                        nama={barang.nama} 
                        harga={barang.harga}
                        stok={barang.stok}
                        counter={barang.count}/>
            ))}
        </div>
    )
}

export default ListBarang
