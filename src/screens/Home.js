import React from 'react'

const Home = () => {
  return (
    <>
      <h1 className="gcont-title">CMS</h1>
      <div className="gcard gcontent">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className='gcont-btn-panel'>
          <button className="gbtn2 gbtn-create">Create</button>
          <button className="gbtn2 gbtn-edit">Edit</button>
          <button className="gbtn2 gbtn-delete">Delete</button>
        </div>
      </div>
    </>
  )
}

export default Home