import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import Header from './components/Header';
import Axios from 'axios';

const App = () => {

    const [products, setProducts] = useState([])
    const [consult, setConsult] = useState(true);

    useEffect(() => {
        const api = async () => {
          if (consult){
            const response = await Axios.get(`http://localhost:4000/restaurant`)
            setProducts(response.data)
          }
            
        }
        api();
        setConsult(false);
    }, [consult])

  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/products" render={() => 
            ( <Products products={products} setConsult={setConsult} /> )
          } />

          <Route exact path="/add-product" render={() => 
            (<AddProduct setConsult={setConsult} />)
          } />
          
          <Route exact path="/products/edit/:id" render={props => {
            const productId = Number(props.match.params.id)
            const product = products.filter(p => p.id === productId)
            return(
              <EditProduct product={product[0]} setConsult={setConsult} />
            )
          }} />
        
        </Switch>
      </div>
    </Router>
  );
};

export default App;