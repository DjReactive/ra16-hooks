import logo from '../logo.svg';
import './App.css';
import Profiles from './Profiles';
import ProfileProvider from './Context'

function App() {
  return (
    <ProfileProvider>
      <div className="content">
        <Profiles />
      </div>
    </ProfileProvider>
  );
}

export default App;
