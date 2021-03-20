
import './App.css';
import ListBarang from './ListBarang';
import AddBarang from './AddBarang';
import NavHeader from './NavHeader';
import { BarangProvider } from './BarangContext';

function App() {
  return (
    <BarangProvider>
    <div className="App">
      <NavHeader />
      <AddBarang />
      <ListBarang />
    </div>
    </BarangProvider>
  );
}

export default App;
