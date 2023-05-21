import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {getSightings} from './network/apiactions';
import TimeSlider from './components/widgets/TimeSlider';
import SightingsScreen from './components/SightingsScreen';
import backgroundImage from './assets/hero5.jpg';

function App() {
  const [loaded,setLoaded] = useState(false);
  const [loadedWithError,setLoadedWithError] = useState(false);
  const [sightings,setSightings] = useState({});
  const [showSightingsScreen, setShowSightingsScreen] = useState(null);

  const loadSightings = async () => {
    try {
      const sightings = await getSightings();
      setSightings(sightings.data);
      setLoaded(true);
    } catch(err) {
      console.log('THIS IS AFTER CALLING TO THE API', sightings);
      setLoadedWithError(true);
      setLoaded(true);
    }
  }

  useEffect(() => {
    loadSightings();
  },[]);

  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    /* Additional CSS properties if needed */
  };

  return (
    <div className="App">
      <div style={divStyle} className="header">
        <h1>UFO Watch - UK</h1>
      </div>
      {
        loaded
        ? <>
          {
            loadedWithError
            ? <div className='center-text'><h1>Sorry there is a network problem, please try again later.</h1></div>
            :<>
              {
                showSightingsScreen
                ? <SightingsScreen setShowSightingsScreen={setShowSightingsScreen} sightingsObject={showSightingsScreen}/>
                : <TimeSlider sightings={sightings} setShowSightingsScreen={setShowSightingsScreen}/>
              }
            </>
          }

        </>
        : <p>Loading...</p>
      }
      
    </div>
  );
}

export default App;
