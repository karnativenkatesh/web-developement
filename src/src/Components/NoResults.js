const NoResults = ({data}) => {
    return(
        <div> 
          <img alt="Noresultslogo" src="./noresults.png"className="SearchbarNoResultsImg" style={{height:"350px",width:"350px"}}/>
          <h4 className="SearchbarNoResults" style={{fontFamily:"Vollkorn"}}>{data}</h4>
        </div>
    )
}

export default NoResults;