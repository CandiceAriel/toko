import './App.css';
import ListBarang from './ListBarang';
import AddBarang from './page/AddBarang'
import ListCart from './ListCart';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import Profile from './page/Profile';
import Home from './page/Home';

import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/" exact={true} component= {Home}/>
        <Route path="/Barang" component= {ListBarang}/>
        <Route path="/AddBarang" component= {AddBarang}/>
        <Route path="/Cart" component= {ListCart}/>
        <Route path="/SignUp" component= {SignUp}/>
        <Route path="/SignIn" component= {SignIn}/>
        <Route path="/Profile" component= {Profile}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
