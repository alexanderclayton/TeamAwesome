import { Avatar } from 'antd';
import { useState } from 'react';
import './Home.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useQuery } from '@apollo/client';
import { GET_IMAGES, GET_AVATAR } from '../utils/queries';
import Draggable from 'react-draggable';
import { Resizable, ResizableBox } from 'react-resizable';
import AvatarAdd from '../components/UploadAvatar/UploadAvatar'
import '../pages/Home.css';

const Home = () => {
  const [imageURL, setImageURL] = useState('');
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [isEditing, setIsEditing] = useState(false);

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

  const { loading: imagesLoading, error: imagesError, data: imagesData } = useQuery(GET_IMAGES);
  const { loading: avatarLoading, error: avatarError, data: avatarData } = useQuery(GET_AVATAR)

  if (imagesLoading || avatarLoading) return <p>Loading...</p>;
  if (imagesError || avatarError) return imagesError.message || avatarError.message  //we need to style this

  const handleAvatarChange = (imageURL) => {
    setImageURL(imageURL);
  }

  return (
    <main>
      <div id="main-page" style={{ display: isEditing ? 'none' : 'block' }} >
        <Avatar size={104} src={avatarData.getAvatar} />
        <h2>{name}</h2>
        <p>@{username}</p>
        <p>{bio}</p>
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        <button onClick={handleScreenshot}>Save Screenshot</button>
      </div>
      <div style={{ display: isEditing ? 'block' : 'none' }}>
        <AvatarAdd onChange={handleAvatarChange} />
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <div id='profile' style={{ display: isEditing ? 'none' : 'block' }} >
        {imagesData.getImages.map((imageUrl) => (
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