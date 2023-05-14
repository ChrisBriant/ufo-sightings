
const SightingsList = (props) => {
    return(
        <div className="card sighgting-list">
            <>
                <h1>{props.heading}</h1>        
                {
                    props.sightings
                    ? <p>{props.sightings.length > 1 ? <>{props.sightings.length} sightings</> : <>1 sighting</> }</p>
                    : <p>No Sightings</p>   
                } 
                <button onClick={() => props.setShowSightingsScreen({heading:props.heading, sightings: props.sightings})}>View Sightings</button>
            </>

        </div>
    )
}

export default SightingsList;