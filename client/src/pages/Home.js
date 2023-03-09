import { Avatar } from 'antd';
import { useState } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '../utils/queries';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';
import '../pages/Home.css';

const Home = () => {
  const [imageURL, setImageURL] = useState('');
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Upload the image file to a database or file storage service
    // and get the URL of the uploaded file.
    const url = 'https://example.com/images/' + file.name;
    setImageURL(url);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save the updated name, username, and bio to the database.
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the name, username, and bio to the original values.
  };

  const handleScreenshot = () => {
    html2canvas(document.querySelector('#profile')).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'screenshot.png')
      });
    });
  };
  
  const { loading, error, data } = useQuery(GET_IMAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>

  return (
    <main id = 'profile'>
      <div style={{ display: isEditing ? 'none' : 'block' }}>
        <Avatar size={104} src={imageURL} />
        <h2>{name}</h2>
        <p>@{username}</p>
        <p>{bio}</p>
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        <button onClick={handleScreenshot}>Save Screenshot</button>
      </div>
      <div style={{ display: isEditing ? 'block' : 'none' }}>
        <Avatar size={104} src={imageURL} />
        <input type="file" onChange={handleImageUpload} />
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <div>
        {data.getImages.map((imageUrl) => (
          <Draggable handle=".drag-handle">
            <ResizableBox width={200} height={200} minConstraints={[50, 50]} maxConstraints={[600, 600]}>
              <div style={{ position: 'relative' }}>
                <div className="drag-handle" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', cursor: 'move' }} />
                <img src={imageUrl} style={{ width: '100%', height: '100%' }} />
              </div>
            </ResizableBox>
          </Draggable>
        ))}
      </div>

    </main>
  );
};

export default Home;

