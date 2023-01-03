import React from 'react'

const Home = () => {
  return (
    <div >
      <h1 className="cont-title">CMS</h1>
      <div className="gcard cont-info">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className='cont-btn-panel'>
          <button className="gbtn2 gbtn-create">Create</button>
          <button className="gbtn2 gbtn-edit">Edit</button>
          <button className="gbtn2 gbtn-delete">Delete</button>
        </div>

      </div>

    </div>
  )
}

export default Home