import React from 'react'

const SocialMedia = () => {
  return (<>
    <p className="gcont-title">Social&nbsp;Media</p>
    <div className="gcard gcontent">
      <p style={{ paddingBottom: '1rem' }}>*Start urls from http://</p>
      <div className='ginput-form'>
        <label>Facebook</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Twitter</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Instagram</label>
        <input type='text' />
      </div>
      <div className='ginput-form'>
        <label>Linkedin</label>
        <input type='text' />
      </div>

      <div>
        <button className="gbtn2 gbtn-create">Save</button>
      </div>
    </div>
  </>
  )
}

export default SocialMedia