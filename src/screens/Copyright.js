import React from 'react';

const Copyright = () => {
  return (<>
    <p className="gcont-title">Copyright</p>
    <div className="gcard gcontent">
      <div className='ginput-form'>
        <label>Copyright</label>
        <input type='text' />
      </div>

      <div>
        <button className="gbtn2 gbtn-create">Save</button>
      </div>
    </div>
  </>
  )
}

export default Copyright