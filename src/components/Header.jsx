import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div style={{display:'flex',gap:12,marginBottom:14}}>
        <Link to={'/'}>Create Post</Link>
        <Link to={'/getpost'}>Get Post</Link>
    </div>
  )
}

export default Header