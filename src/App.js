
import './App.css';
import ListBarang from './ListBarang';
import ListCart from './ListCart';
import {Router, Switch,Route} from 'react-router-dom'

import { BarangProvider } from './context/BarangContext';


function App() {
  return (
    <BarangProvider>
        <ListBarang />
    </BarangProvider>
  );
}

export default App;
