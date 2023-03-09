import { useState } from 'react';
import './Home.css';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useQuery } from '@apollo/client';
import { GET_IMAGES, GET_AVATAR } from '../utils/queries';
import UserProfile from '../components/UserProfile/UserProfile';
import EditProfile from '../components/EditProfile/EditProfile';
import ImageArray from '../components/ImageArray/ImageArray';
import '../pages/Home.css';

const Home = () => {
  const [name, setName] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleScreenshot = () => {
    html2canvas(document.querySelector('#profile')).then((canvas) => {
      canvas.toBlob((blob) => {
        window.print(); 
      });
    });
  };
  

  const { loading: imagesLoading, error: imagesError, data: imagesData } = useQuery(GET_IMAGES);
  const { loading: avatarLoading, error: avatarError, data: avatarData } = useQuery(GET_AVATAR);

  if (imagesLoading || avatarLoading) return <p>Loading...</p>;
  if (imagesError || avatarError) return imagesError.message || avatarError.message;  //we need to style this

  return (
    <main>
      <div id="main-page" style={{ display: isEditing ? 'none' : 'block' }} >
        <UserProfile
          name={name}
          username={username}
          bio={bio}
          avatarUrl={avatarData.getAvatar}
          setIsEditing={setIsEditing}
          handleScreenshot={handleScreenshot}
        />
      </div>
      <div style={{ display: isEditing ? 'block' : 'none' }}>
        <EditProfile
          name={name}
          setName={setName}
          username={username}
          setUsername={setUsername}
          bio={bio}
          setBio={setBio}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
      <div id='profile' style={{ display: isEditing ? 'none' : 'block' }}>
        {imagesData.getImages.map((imageUrl) => (
          <ImageArray
            imageUrl={imageUrl}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
