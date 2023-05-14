import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {getSightings} from './network/apiactions';
import TimeSlider from './components/widgets/TimeSlider';
import SightingsScreen from './components/SightingsScreen';

function App() {
  const [loaded,setLoaded] = useState(false);
  const [sightings,setSightings] = useState({});
  const [showSightingsScreen, setShowSightingsScreen] = useState(null);

  const loadSightings = async () => {
    const sightings = await getSightings();
    setSightings(sightings.data);
    setLoaded(true);
  }

  useEffect(() => {
    loadSightings();
  },[]);


  return (
    <div className="App">
      {
        loaded
        ? <>
          {
            showSightingsScreen
            ? <SightingsScreen setShowSightingsScreen={setShowSightingsScreen} sightingsObject={showSightingsScreen}/>
            : <TimeSlider sightings={sightings} setShowSightingsScreen={setShowSightingsScreen}/>
          }
        </>
        : <p>Loading...</p>
      }
      
    </div>
  );
}

export default App;
