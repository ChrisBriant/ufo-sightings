import { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import SightingsList from "./SightingsList";
//import Slider from 'react-slider';

const getSegments = (sightingsObj,unit="Y") => {
    console.log('I SHOULD ONLY LOAD ONCE');
    let segments = {};
    if(unit==="Y") {
        const keys = Object.keys(sightingsObj);
        //Get max and min years
        const minYear = parseInt(keys[0]);
        const maxYear = parseInt(keys[keys.length-1]);
        for(let i=minYear;i<maxYear+1;i++) {
            //console.log(i,sightingsObj.hasOwnProperty(i.toString()));
            if(sightingsObj.hasOwnProperty(i.toString())) {
                segments[i.toString()] = sightingsObj[i.toString()]; 
            } else {
                segments[i.toString()] = null;
            }
            //segments.push(i);
        }
        console.log('SEGMENTS', segments,maxYear);
    }
    return segments;
}

const TimeSlider = (props) => {
    const [segments,setSegments] = useState({});  
    const [position, setPosition] = useState(0);
    //const percentPerYear = (1 / Object.keys(props.sightings).length) * 100
    const [percentPerYear,setPercentPerYear] = useState(0);
    const [selectedSegment,setSelectedSegment] = useState({});
    const [heading,setHeading] = useState("");
    const [loaded,setLoaded] = useState(false);
    const browserWidth = window.innerWidth;
    console.log(browserWidth);

    useEffect(() => {
        console.log('I AM RELOADING', position);
        const fetchedSegments = getSegments(props.sightings)
        setSegments(fetchedSegments);
        const segmentKeys = Object.keys(fetchedSegments);
        setPercentPerYear((1 / segmentKeys.length) * 100);
        setHeading(segmentKeys[0]);
        setSelectedSegment(fetchedSegments[segmentKeys[0]]);
        //console.log('THESE ARE THE SEGMENTS', fetchedSegments);
        setLoaded(true);
        //(1 / Object.keys(props.sightings).length) * 100);
    },[]);
    

    const handleDrag = (e, ui) => {
      const newPosition = position + ui.deltaX;
      setPosition(newPosition);
      console.log('POSITION', position);
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
      console.log('Percent reached', percentageOfBar, segment[segmentIndex]);
    };
  
    // const handleSliderChange = (value) => {
    //   setPosition(value);
    //   console.log('POSITION', value);
    // };

    const parentWidth = window.innerWidth - 60; // Adjusted width based on margin


    return (
        <>
            {
                loaded
                ? <>
                    <div className="sightings-container">
                        <SightingsList sightings={selectedSegment} heading={heading} />
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

                {/* <Slider
                    className="slider"
                    value={position}
                    onChange={handleSliderChange}
                    min={0}
                    max={1000}
                /> */}
        </>

    );
}

export default TimeSlider;