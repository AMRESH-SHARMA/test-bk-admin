import React from 'react';

const Logos = () => {
  return (<>
    <p className="gcont-title">Logos</p>
    <div className="gcard gcontent">
      <p style={{ paddingBottom: '1rem' }}>Upload jpg, jpeg and png only*</p>
      <p style={{ fontSize: '15px', paddingBottom: '5px' }}>Update logo for Website header</p>
      <div className='ginput-form' >
        <input type='file' style={{ padding: '0', height: '1.5rem' }} />
      </div>
      <p style={{ fontSize: '15px', paddingBottom: '5px' }}>Update logo for website footer</p>
      <div className='ginput-form'>
        <input type='file' style={{ padding: '0', height: '1.5rem' }} />
      </div>
      <p style={{ fontSize: '15px', paddingBottom: '5px' }}>Update logo for Admin application</p>
      <div className='ginput-form'>
        <input type='file' style={{ padding: '0', height: '1.5rem' }} />
      </div>

      <div>
        <button className="gbtn2 gbtn-create">Save</button>
      </div>
    </div>
  </>);
}
export default Logos