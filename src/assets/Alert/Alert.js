import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAlert } from "../../Redux/actions/useAlert";
import "./Alert.css";
const Alert = () => {
  const alert = useSelector((state) => state.alert);
  const { clearAlert } = useAlert();
  const [alertColor, setAlertColor] = useState()

  useEffect(() => {
    setAlertColor(alert.color)
    if (alert.open) {
      const timer = setTimeout(() => {
        console.log('Initial timeout!');
        clearAlert()
      }, alert.timeout)
      return () => clearTimeout(timer);
    }

  }, [alert.open,alert.color,clearAlert,alert.timeout]);



  const handleClose = () => {
    clearAlert()
  }

  return (<>
    {alert.open &&
      <div className='alert-container' style={{ backgroundColor: alertColor }}>
        <div className='alert-inner'>

          <p>ALERT! {alert.message}</p>
          <p>TIMEOUT:{alert.timeout}</p>

          <p onClick={handleClose} className='gbtncross' style={{padding:'0px 5px'}}> &#10005;</p>

        </div>
      </div>}
  </>
  );
}

export default Alert