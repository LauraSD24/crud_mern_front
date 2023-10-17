import ContextProviderProduct from './contexts/ContextProviderProduct';
import RoutesProducts from './routes/RoutesProducts';

function App() {
  return (
    <div className="App">
      <ContextProviderProduct>
        <RoutesProducts/> 
      </ContextProviderProduct>
    </div>
  );
}

export default App;
