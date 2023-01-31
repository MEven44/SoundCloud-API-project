import React, {useState} from 'react'


function SearchBar({placeholder, data}) {
    const [filteredData, setFilteredData] = useState([])
  
    const handleFilter = e => {
      const searchWord = e.target.value
      const newFilter = data.songList.filter( value => {
        return value.title.toLowerCase().includes(searchWord.toLowerCase())
      })
      if (searchWord === '') {
        setFilteredData([])
      } else {
      setFilteredData(newFilter)
      console.log('filtered data', filteredData)
      }
    }

    return (
      <div className="search">
        <div className="search-input">
          <input type="text" placeholder={placeholder} onChange={handleFilter}/>

          <div className="search-icon">
            <i className="search-icon" class="fa-solid fa-magnifying-glass" />
          </div>
        </div>
        {filteredData.length !== 0 && (
        <div className="data-results">
            {filteredData.slice(0,15).map((value,key)=>{
                return <a className='data-item' href={value.url} target='_blank'> {value.title} </a>
            })}
        </div>
        )}
      </div>
    );
}

export default SearchBar