import ShoopingMap from "../../components/Shopping/ShoppingMap";
import React from "react";
import Nav2 from "../../components/Main/Nav/Nav.view";
const ShoppingScreen: React.FC = () =>{
    return(
        <>
          <Nav2></Nav2>
          <ShoopingMap></ShoopingMap>
        </>
      
    )
}

export default ShoppingScreen;