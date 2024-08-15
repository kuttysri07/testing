import "./nav.css"
import shopping from "../Assets/shopping.svg"
import profile from "../Assets/profile.jpg"
import hamburger from "../Assets/hamburger.png"
import { useState } from "react"

const Nav = () => {

  const [mobilemenu,setmobilemenu]=useState(false)

  function menutoggle(){
    mobilemenu? setmobilemenu(false):setmobilemenu(true);
    
  }

  return (
    <div>
     <nav>
     <img  className=" hamburger" src={hamburger} alt="" onClick={menutoggle} />
      <h1>zudio</h1>
      <ul className={mobilemenu ? "":'hidemenu'} >
          <li>Home</li>
          <li>Sarees</li>
          <li>Aboutus</li>
          <li>Contact</li>
      </ul>
      <div className="content">
        <img className="cart" src={shopping} alt="" />
        <img  className="profile" src={profile} alt="" />     
      </div>
     

     </nav>
    </div>
  )
}

export default Nav