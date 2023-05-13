import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {getSightings} from './network/apiactions';
import TimeSlider from './components/widgets/TimeSlider';

function App() {
  const [loaded,setLoaded] = useState(false);
  const [sightings,setSightings] = useState({});

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
        ? <TimeSlider sightings={sightings}/>
        : <p>Loading...</p>
      }
      
    </div>
  );
}

export default App;
