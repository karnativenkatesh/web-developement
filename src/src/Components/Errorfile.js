const Errorfile = ({data}) => {
    return(
        <div>
        <img src="./errorimage.png"className="SearchbarNoResultsImg"/>
        <h3 className="SearchbarNoResults">{data}</h3>
      </div>
    )
}

export default Errorfile;