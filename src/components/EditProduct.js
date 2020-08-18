import React, {useState, useRef} from 'react';
import Error from './Error';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const EditProduct = ({history, product, setConsult}) => {

    const nameRef = useRef('');
    const priceRef = useRef('');

    const [error, setError] = useState(false)
    const [category, setCategoty] = useState('');


    const handleChange = e => {
        setCategoty(
            e.target.value
        )
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        if (nameRef.current.value.trim() === "" || priceRef.current.value.trim() === ""){
            setError(true)
            return;
        }

        setError(false);

        let editCategory = (category === '') ? product.category : category ;

        const editData = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            category: editCategory
        }

        try {
            const data = await Axios.put(`http://localhost:4000/restaurant/${product.id}`, editData)

            console.log(data)
            if (data.status === 200) {
                Swal.fire(
                    'Product edited successfuly!',
                    '',
                    'success'
                )
                history.push('/products')
                setConsult(true)
            }
        } catch (error) {
            setError(true)
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: "Can't add the product.",
            })
        }

    };

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Edit Product</h1>

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
                        ref={nameRef}
                        defaultValue={product.name}
                    />
                </div>

                <div className="form-group">
                    <label>Product Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Product Price"
                        ref={priceRef}
                        defaultValue={product.price}
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
                            defaultChecked={(product.category === 'dessert')}
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
                            defaultChecked={(product.category === 'drink')}

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
                            defaultChecked={(product.category === 'meal')}
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
                            defaultChecked={(product.category === 'salad')}
                        />
                        <label className="form-check-label" htmlFor="salad">
                            Salad
                        </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Edit Product" />
            </form>
        </div>
    );
};

export default withRouter(EditProduct);