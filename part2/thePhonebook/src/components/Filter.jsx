import React from 'react'

const Filter = ({search,handleSearch}) => {
    return (
        <div>
            <h2>Search
                <input value={search} onChange={handleSearch} />
            </h2>
        </div>
    )

}

export default Filter