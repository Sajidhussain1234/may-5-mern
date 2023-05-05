import React from 'react'
import axios from 'axios';

const FindMerchant = () => {

    const handleClick = async(e) =>{
        try {
            // id missmatch ==== response: null
            // const response = await axios.get('http://localhost:3001/api/merchants/6451f90a140bca7517b7fc33') 
            // id format missmatch 
            const response = await axios.get('http://localhost:3001/api/merchants/6451f90a140bca7517b7fc34')
            console.log('Response:', response.data);           

        } catch (error) {
            console.error('Error:', error);
        } 
    };

  return (
    <div>
       <button type="button" className="btn btn-info" onClick={handleClick}>Find Merchant</button>
    </div>
  )
}

export default FindMerchant;