/* eslint-disable @next/next/no-img-element */
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

// FUNCTION TO RENDER HOME SCREEN
function Home() {
  const { user } = useAuth();

  return (
    <div
      id="index-one"
      style={{
        height: '90vh',
        padding: '30px',
        paddingTop: '10px',
        alignItems: 'center',
      }}
    >
      <h1>Welcome, {user.displayName}! </h1>
      <img src="/logo.png" alt="icon" className="nav-logo" width="400" height="400" id="image" />
      <p>Click the button below to logout!</p>
      <Button variant="danger" id="bye" type="button" size="medium" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
