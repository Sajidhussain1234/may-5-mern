import React, { useState } from 'react'
import axios from 'axios'

const AddNewMerchant = (props) => {
    const [newMerchant, setNewMerchant] = useState({
        name: "",
        email: "", 
        education: ""

    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3001/api/merchant', newMerchant);
            console.log('Response:', response); 

            props.setMerchants([...props.merchants, {...newMerchant, _id: response.data?._id}]); 
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
            console.error(error);
        }    
    }; 

    const handleChange = (e) => {
        setNewMerchant({ ...newMerchant, [e.target.name]: e.target.value });
    };

    if (isLoading) return (<h4>Merchant is adding...</h4>)
    if (isError) return (<h4>Some thing went wrong...</h4>)

    return (
        <div className='container'>
            <h3 className='mt-3'>Add Merchant </h3>
            {/* <div className=" container mb-3 border rounded"> */}
                <form onSubmit={handleSubmit} className='d-flex'>
                    {/* <label htmlFor="name" className="form-label">Name</label> */}
                    <input type="text" className="form-control mx-2" id="name" name="name"  placeholder='Name' onChange={handleChange} />
                    {/* <label htmlFor="email" className="form-label">Email address</label> */}
                    <input type="email" className="form-control mx-2" id="email" name="email" placeholder='Email' onChange={handleChange} />
                     {/* <label htmlFor="eduction" className="form-label">Education</label> */}
                     <input type="education" className="form-control mx-2" id="education" name="education" placeholder='Education' onChange={handleChange} />
                    <button type="submit" className="btn btn-primary py-2">Submit</button>
                </form>
            </div>
        // </div>
    )
}

export default AddNewMerchant;