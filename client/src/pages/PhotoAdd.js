import { useFileUpload } from "../utils/firebase";
import { useState } from "react";
import { Avatar } from 'antd';


const PhotoAdd = () => {
  const [file, setPhoto] = useState(null);
  const{fileUpload} = useFileUpload();
  const [photoPreview, setPhotoPreview] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    fileUpload(file);
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
  };

  const cancel = (e) => {
    e.preventDefault();
    window.location.href="/home"
  }


  
    return (
    <>
    <div>
    <h1>Add your photo here:</h1>
    {photoPreview ? (
        <Avatar shape="square" size={104} src={photoPreview} />
      ) : (
        <Avatar shape="square" size={104} />
      )}
    </div>
    <input type="file" id="selected-photo" name="selected-photo" onChange={handleFileChange} />
    <br />
    <button onClick={submit} type="submit">Submit</button>
    <br />
    <button onClick={cancel} type="submit">Cancel</button>
    <br />
    </>
    );
  };
  
export default PhotoAdd;