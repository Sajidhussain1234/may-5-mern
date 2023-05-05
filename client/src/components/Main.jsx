import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import AddNewMerchant from './AddNewMerchant';

const Main = () => {
    const [merchants, setMerchants] = useState([]);
    console.log(merchants);
    // this state is for update merchant
    const [mrchnt, setMrchnt] = useState({
        name: "",
        email: ""
    })
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const ref = useRef(null);
    const refClose = useRef(null);

    const getApi = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/merchants');
            const data = await res.data;
            setMerchants(data);
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.error(error);
        }
    };


    // =========================== Delete Mercant ==============================

    const handleDeleteClick = async (delId) => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`http://localhost:3001/api/merchant/${delId}`);
            setMerchants(merchants.filter(m => m._id !== response.data._id))
            console.log(response.data);
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.error(error);
        }
    };

    // =========================== Update Merchant ==============================

    const handleUpdateClick = async () => {
        // console.log(mrchnt)
        ref.current.click();

        try {
            setIsLoading(true)
            const response = await axios.put(`http://localhost:3001/api/merchants/${mrchnt._id}`, mrchnt);
            const updatedMerchants = merchants.map((merchant) => {
                if (merchant._id === mrchnt._id) {
                    return mrchnt;
                } else {
                    return merchant;
                }
            });

            // Set the state variable with the updated array
            setMerchants(updatedMerchants);
            setIsLoading(false)
            console.log(response.data);

        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.error(error);
        }
    };

    const handleEditClick = async (id) => {
        ref.current.click();
        const m = merchants.find(m => m._id === id);
        setMrchnt(m);
    };

    const onChange = (e) => {
        setMrchnt({ ...mrchnt, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getApi();
    }, []);

    if (isLoading) return (<h4>Process running...</h4>)
    if (isError) return (<h4>Some thing went wrong...</h4>)

    return (
        <>
            <div className='container'>
                <AddNewMerchant merchants={merchants} setMerchants={setMerchants} />
            </div>
            <hr />
            <div className='container'>
                <h3 className='mt-3'>All Merchants  </h3>

                <div class="row row-cols-1 row-cols-md-4 g-6 my-2">

                    {merchants?.map((merchant) => {
                        return (
                            <div className="col my-2 " key={merchant._id}>
                                <div className="card" >
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Name:  <strong> {merchant.name} <br /> </strong>Email:<strong> {merchant.email} </strong></li>
                                        <div className='d-flex justify-content-between list-group-item'>
                                            <button type="button" className="btn btn-danger mx-1" onClick={() => handleDeleteClick(merchant._id)}> delete</button>
                                            <button type="button" className="btn btn-info mx-1" onClick={() => handleEditClick(merchant._id)}> edit</button>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}

                </div>

                {/* ======================  Merchant Update UI Code ============================ */}
                
                <div>
                    <button
                        ref={ref}
                        type="button"
                        className="btn btn-primary d-none"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Launch demo modal
                    </button>

                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Edit Merchant:
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form className="my-3">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={mrchnt.name}
                                                onChange={onChange}
                                            />
                                            <label htmlFor="eemail" className="form-label">
                                                email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={mrchnt.email}
                                                onChange={onChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        ref={refClose}
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleUpdateClick}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Main;