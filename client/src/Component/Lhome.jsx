import React from 'react'

function Lhome() {
  return (
    <div className='landing_home'>

       <div className="left-side">
              <img src={require('../assets/images/bg1.png')} alt="" />
       </div>
       <div className="right-side">
       <div className="index"></div>
        <div className="absolute">
          <h1>travel && <br /> adventure</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, perferendis mollitia aut itaque voluptatibus saepe consequuntur neque tempora quae? Explicabo?</p>
    <a href="">explore more</a>
        </div>
              <img src={require('../assets/images/bg2.png')} alt="" />
       </div>
 
    </div>
    
  )
}

export default Lhome