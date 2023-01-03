import React from 'react'

const Address = () => {
  return (<>
    <p className="gcont-title">Address</p>
    
    <div className="gcard gcontent">
      <div className='ginput-form'>
        <label>Company&nbsp;Name*</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Address</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>City</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>State</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Country</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>PinCode</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Contact&nbsp;Number</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Email</label>
        <input type='text' />
      </div>

      <div>
        <button className="gbtn2 gbtn-create">Save</button>
      </div>
    </div>
  </>
  )
}

export default Address