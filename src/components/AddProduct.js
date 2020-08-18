import React, { useState } from 'react';
import Error from './Error';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const AddProduct = ({ history, setConsult }) => {

    const [error, setError] = useState(false);
    const [addProduct, setAddProduct] = useState({
        name: '',
        price: '',
        category: ''
    })

    const { name, price, category } = addProduct;

    const handleChange = e => {
        setAddProduct({
            ...addProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === "" || price.trim() === "" || category.trim() === "") {
            setError(true);
            return;
        }

        setError(false);
        try {
            const data = await Axios.post('http://localhost:4000/restaurant', addProduct)

            if (data.status === 201) {
                Swal.fire(
                    'Product added successfuly!',
                    '',
                    'success'
                )
                history.push('/products')
                setConsult(true)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: "Can't add the product.",
            })
        }
    };

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Add New Product</h1>

            {error ? (<Error message="All fields are required" />) : null}

            <form
                className="mt-5"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Product Name"
                        onChange={handleChange}
                        value={name}
                    />
                </div>

                <div className="form-group">
                    <label>Product Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Product Price"
                        onChange={handleChange}
                        value={price}
                    />
                </div>

                <legend className="text-center">Category:</legend>

                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="category"
                            value="dessert"
                            id="dessert"
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="dessert">
                            Dessert
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="category"
                            value="drink"
                            id="drink"
                            onChange={handleChange}

                        />
                        <label className="form-check-label" htmlFor="drink">
                            Drink
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="category"
                            value="meal"
                            id="meal"
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="meal">
                            Meal
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="category"
                            value="salad"
                            id="salad"
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="salad">
                            Salad
                        </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Add Product" />
            </form>
        </div>
    );
};

export default withRouter(AddProduct);