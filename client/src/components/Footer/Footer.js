import './footer.css';
import { GithubFilled } from '@ant-design/icons';

const Footer = () => {

  const handleGithubClick = (url) => {
    window.open(url, '_blank');
  }

  return (
    <footer className='footer'>
      Project completed by:  
      McKenna Lawson
      <span className="github-icon" onClick={() => handleGithubClick('https://github.com/mac-codes')}>
        <GithubFilled className="mckenna" style={{ padding: "-5px", color: '#6f42c1', fontSize: 24, cursor: 'pointer' }} />
      </span> 
       Alex Clayton
      <span className="github-icon" onClick={() => handleGithubClick('https://github.com/alexclaytonbootcamp')}>
        <GithubFilled className="alex" style={{ color: '#6f42c1', fontSize: 24, cursor: 'pointer' , }} />
      </span> 
      Seth VanMeter
      <span className="github-icon" onClick={() => handleGithubClick('https://github.com/svanmeter93')}>
        <GithubFilled className="seth" style={{ color: '#6f42c1', fontSize: 24, cursor: 'pointer' }} />
      </span> 
      Josh Torrence
      <span className="github-icon" onClick={() => handleGithubClick('https://github.com/DeadEye44')}>
        <GithubFilled className="josh" style={{ color: '#6f42c1', fontSize: 24, cursor: 'pointer' }} />
      </span> 
    </footer>
  );
};

export default Footer;
