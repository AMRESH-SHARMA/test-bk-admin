import { React, useState } from 'react'
import { ERROR, IMG } from '../assets/constants/theme';

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null)

  if (file.length) {
    return (
      <div>
        <p>Profile Image</p>
        <img src={file} alt="preview" style={{...IMG.style1,...ERROR.inputFTrue}} />
      </div>
    )
  }
  else if (file) {
    console.log(typeof (file));
    console.log(file.length);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result)
    }
    return (
      <div>
        <p>Profile Image</p>
        <img src={preview} alt="preview" style={{...IMG.style1,...ERROR.inputFTrue}} />
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default PreviewImage