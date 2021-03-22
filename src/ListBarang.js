import React, { useContext } from 'react'
import {BarangContext} from './context/BarangContext'
import NavHeader from './NavHeader';
import Barang from './Barang';
import AddBarang from './AddBarang';
import Cart from './Cart';

const ListBarang = () => {
    const [barang,setBarang]=useContext(BarangContext);
    
 
    return (
        <div>
            <NavHeader />
            <Barang />
            <AddBarang />
            {barang.map(barang => (
                <Barang id={barang.id}
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
