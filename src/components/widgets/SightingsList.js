
const SightingsList = (props) => {
    console.log('Props passed to sightings list', props);

    return(
        <div className="card sighgting-list">
            <>
                <p>{props.heading}</p>        
                {
                    props.sightings
                    ? <p>{props.sightings.length > 1 ? <>{props.sightings.length} sightings</> : <>1 sighting</> }</p>
                    // ? props.sightings.map((sighting) => ( 
                    //     <div key={sighting.id}><p>{sighting.location_name}</p></div>
                    // ))
                    : <p>No Sightings</p>   
                } 
            </>

        </div>
    )
}

export default SightingsList;