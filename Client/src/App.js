import './App.css';
import ListBarang from './ListBarang';
import AddBarang from './AddBarang'
import ListCart from './ListCart';
import NavHeader from './NavHeader';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'

import { BarangProvider } from './context/BarangContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
    <div>
    <NavHeader />
    <Switch>
    <Route path="/Barang" component= {ListBarang}/>
    <Route path="/AddBarang" component= {AddBarang}/>
    <Route path="/Cart" component= {ListCart}/>
        {/*<ListBarang /> */}
    </Switch>
  
    </div>
    </Router>
  );
}

export default App;
