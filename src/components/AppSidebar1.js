import React from 'react'
import { Link } from 'react-router-dom';

const AppSidebar = () => {


  const [show, setShow] = React.useState(true)

  const displayTrue = {
    display: 'block',
    backgroundColor: 'rgb(182, 182, 182)',
    width: '150px',
    height: '100vh',
    
  }
  const displayFalse = {
    width: '65px',
    height: '100vh',
  }

  const handleSidebar = () => {
    console.log(show);
    setShow(!show)
  }

  if (show) {
    return (
      <>
        <div style={displayTrue}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSidebar}
              type='button'
              className='gbtncross'
              style={{ backgroundColor: 'purple',minWidth: '70px', height: '25px', padding: '1px 2px' }}>
              &#10005;
            </button>
          </div>

          <nav>
            <Link to="/home">Home</Link>
          </nav>
          <nav>
            <Link to="/topics">topics</Link>
          </nav>
          <nav>
            <Link style={{ textDecoration: 'none' }} to="/modal">Modal</Link>
          </nav>
          <nav>
            <Link style={{ textDecoration: 'none' }} to="/login">Login</Link>
          </nav>
          <nav>
            <Link style={{ textDecoration: 'none' }} to="/register">Register</Link>
          </nav>
        </div>

      </>
    )
  } else {
    return (
      <>
        <div style={displayFalse}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSidebar}
              type='button'
              className='gbtncross'
              style={{ backgroundColor: 'purple', minWidth: '70px', height: '25px', padding: '1px 2px' }}>
              &#8594;
            </button>
          </div>
          <nav>
            <Link style={{ textDecoration: 'none' }} to="/home">Tab1&#8594;</Link>
          </nav>
          <nav>
            <Link style={{ textDecoration: 'none' }} to="/topics">Tab2&#8594;</Link>
          </nav>
          <nav>
            <Link style={{ textDecoration: 'none' }} to="/modal">Modal&#8594;</Link>
          </nav>
        </div>

      </>
    )
  }


}

export default AppSidebar