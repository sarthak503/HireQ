import React from 'react'
import '../../src/App.css'
const date=new Date().getFullYear();
function footer() {
  return (
    <div className='footer'>
        <p>
          Made with 	 <span> &hearts;  </span> by Sarthak
          <br></br>
          Copyright &copy;  {date}
        </p>
    </div>
  )
}

export default footer