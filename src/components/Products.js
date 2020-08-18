import React from 'react';
import Product from './Product';

const Products = ({products, setConsult}) => {

    const iterateProducts = products => (
        products.map(product => (
            <Product 
                key={product.id}
                product={product}
                setConsult={setConsult}
            />
        ))
    );

    return (
        <div>
            <h1 className="text-center">Products</h1>
            <ul className="list-group mt-5">
                {iterateProducts(products)} 
            </ul>
        </div>
    );
};

export default Products;