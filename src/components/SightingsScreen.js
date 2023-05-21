import { useState } from "react";


const SightingsScreen = (props) => {
    const [selectedSighting, setSelectedSighting] = useState(null);
    const browserWidth = window.innerWidth;
    console.log("FROM THE SIGHTINGS SCREEN", props);

    return(
        <div className="sightings-screen">
            <h1>{props.sightingsObject.heading}</h1>
            <div className="sightings-panel">
                <div className="sightings-list">
                    {
                        props.sightingsObject.sightings
                        ? <>
                            {
                                props.sightingsObject.sightings.map((sighting) => (
                                    <p key={sighting.id} className="sighting-list-item" onClick={() => setSelectedSighting(sighting) }>{sighting.location_name}</p>
                                ))
                            }
                        </>
                        : <p>There are no sightings</p>
                    }
                </div>
                <div className="sightings-detail">
                    {
                        selectedSighting
                        ? <div className="sighting-object">
                            <h2><strong>{selectedSighting.location_name}</strong></h2>
                            <div className="list-item">
                                <p><strong>Date:</strong></p>
                                <p>{selectedSighting.occurrence_date}</p>
                            </div>
                            <div className="list-item">
                                <p><strong>Shape:</strong></p>
                                <p>{selectedSighting.shape}</p>
                            </div>
                            <div className="list-item">
                                <p><strong>Sighting Duration:</strong></p>
                                <p>{selectedSighting.duration}</p>
                            </div>
                            <p>{selectedSighting.story}</p>
                        </div>
                        : browserWidth > 760
                            ? <p>Select a sighting from the left to view details.</p>
                            : <p>Select a sighting from the top to view details.</p>
                    }
                </div>
            </div>


            <div className="sightings-screen-footer">
                <button onClick={() => props.setShowSightingsScreen(null)} >Back to Timeline</button>
            </div>
        </div>
    );
}

export default SightingsScreen;