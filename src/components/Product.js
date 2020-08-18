import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';

const Product = ({product, setConsult}) => {

    const deleteProduct = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const data = await Axios.delete(`http://localhost:4000/restaurant/${id}`)

                    if (data.status === 200){
                        Swal.fire(
                            'Deleted!',
                            'Product has been deleted.',
                            'success'
                        )
                        setConsult(true)
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: `Something went wrong!, ${error}`,
                        text: "Can't add the product.",
                    })
                }
            }
        })
    }

    return (
        <li 
            data-category={product.category}
            className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {product.name} {' -- '}
                <span className="font-weigth-bold ml-1">
                    ${product.price}
                </span>
            </p>

            <div>
                <Link 
                    to={`/products/edit/${product.id}`}
                    className="btn btn-info"
                >Edit</Link>

                <button 
                    className="btn btn-primary ml-2"
                    onClick={() => deleteProduct(product.id) }
                >Delete &times;</button>
            </div>
        </li>
    );
};

export default Product;