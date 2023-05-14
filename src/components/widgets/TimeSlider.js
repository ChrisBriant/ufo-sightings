import { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import SightingsList from "./SightingsList";

const getSegments = (sightingsObj,unit="Y") => {
    let segments = {};
    if(unit==="Y") {
        const keys = Object.keys(sightingsObj);
        //Get max and min years
        const minYear = parseInt(keys[0]);
        const maxYear = parseInt(keys[keys.length-1]);
        for(let i=minYear;i<maxYear+1;i++) {
            if(sightingsObj.hasOwnProperty(i.toString())) {
                segments[i.toString()] = sightingsObj[i.toString()]; 
            } else {
                segments[i.toString()] = null;
            }
        }
    }
    return segments;
}

const TimeSlider = (props) => {
    const [segments,setSegments] = useState({});  
    const [position, setPosition] = useState(0);
    const [percentPerYear,setPercentPerYear] = useState(0);
    const [selectedSegment,setSelectedSegment] = useState({});
    const [heading,setHeading] = useState("");
    const [loaded,setLoaded] = useState(false);
    const browserWidth = window.innerWidth;

    useEffect(() => {;
        const fetchedSegments = getSegments(props.sightings)
        setSegments(fetchedSegments);
        const segmentKeys = Object.keys(fetchedSegments);
        setPercentPerYear((1 / segmentKeys.length) * 100);
        setHeading(segmentKeys[0]);
        setSelectedSegment(fetchedSegments[segmentKeys[0]]);
        setLoaded(true);
    },[]);
    

    const handleDrag = (e, ui) => {
      const newPosition = position + ui.deltaX;
      setPosition(newPosition);
      const percentageOfBar = position / (browserWidth - 60) * 100;
      //Get the position in the array of keys which corresponds to the position of the bar
      let segmentIndex = Math.floor(percentageOfBar / percentPerYear)
      const segment = Object.keys(segments);
      //Handles max position of the bar so that it aligns with the data
      if(segmentIndex === segment.length) {
        segmentIndex = segment.length -1;
      }
      //Heading is the unit, for example year
      setHeading(segment[segmentIndex]);
      setSelectedSegment(segments[segment[segmentIndex]]);
    };
  
    const parentWidth = window.innerWidth - 60; // Adjusted width based on margin


    return (
        <>
            {
                loaded
                ? <>
                    <div className="sightings-container">
                        <SightingsList sightings={selectedSegment} heading={heading} setShowSightingsScreen={props.setShowSightingsScreen} />
                    </div>
                    <div className="slider-container" >
                        <Draggable
                            axis="x"
                            // bounds="parent"
                            bounds={{ left: 0, right: parentWidth }}
                            onDrag={handleDrag}
                            position={{ x: position, y: 0 }}
                        >
                        <div className="slider-handle" />
                        </Draggable>
                    </div>
                </>
                : <p>Loading...</p>
        
            }
        </>

    );
}

export default TimeSlider;