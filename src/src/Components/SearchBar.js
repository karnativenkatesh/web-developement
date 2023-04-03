import './SearchBar.css'

const SearchBar = (props) => {
  return(
    <div>
      <form onSubmit={props.handleGetRequest}>
        <input className='SearchbarBody' type="text" autoComplete="off" name="searchvalue" placeholder={"Search your requirement.."} />
        <button className='SearchbarButton'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar;