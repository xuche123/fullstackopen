import React from 'react'

const Filter = ({search, onChange}) => {
  return (
      <div>filter shown with <input value={search} onChange={onChange}></input></div>
  )
}

export default Filter