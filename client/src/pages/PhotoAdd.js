import { useFileUpload } from "../utils/firebase";
import { useState } from "react";


const PhotoAdd = () => {
  const [file, setFile] = useState(null);
  const{fileUpload} = useFileUpload();
  const submit = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    fileUpload(file);
  };


  
    return (
    <>
    <h1>Add your photo here:</h1>
    <input onChange={(e) => {
      setFile(e.target.files[0]);
    }}type="file" />
    <br />
    <button onClick={submit}type="submit">Submit</button>
    <br />
    <button>Cancel</button>
    <br />
    </>
    );
  };
  
export default PhotoAdd;