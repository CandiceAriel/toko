import React, {useState} from 'react'
import './style/Barang.scss'

const Barang = ({id,nama, harga,stok}) => {
    const [count,setCount] = useState(0);
    const [stokBaru,setStok] = useState(stok);
    const hargaBaru = useState(harga);
    const [total,setTotal]= useState(0);

    const kurangiStok =() => {
       if(stokBaru == 0 ){
            setCount(count+ 0)
            alert ("Stok Kurang")
        } else { 
            setCount(count+1)
            setStok(stokBaru - 1)
        }
    }

    const tambahStok =() => {
        setCount(count-1)
        setStok(stokBaru +1)
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Barang
