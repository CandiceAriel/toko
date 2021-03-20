import React, {useState} from 'react'
import './style/Barang.scss'

const Barang = ({id,nama, harga,stok}) => {
    const [count,setCount] = useState(0);
    const [stokBaru,setStok] = useState(stok);
    const hargaBaru = useState(harga);
    const [total,setTotal]= useState(0);

    const kurangiStok =() => {
        setCount(count+1)
        setStok(Math.round(stokBaru -1))

        if(count > stokBaru){
            setCount(count+ 0)
            alert ("Stok Kurang")
        }
    }

    const tambahStok =() => {
        setCount(count-1)
        setStok(stokBaru +1)
    }

    const hitungTotal = () => {
        total = count * hargaBaru
        setTotal(total)
    }

    return (
        <div className="container">
            <div>
                <table className="table">
                    <tbody>
                        <td>{id}</td>
                        <td>{nama}</td>
                        <td>{harga}</td>
                        <td>{stokBaru}</td>
                        <td>{count}</td>
                        <td><button onClick={kurangiStok}>+</button><button onClick={tambahStok}>-</button></td>
                        <td>{hitungTotal}</td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Barang
