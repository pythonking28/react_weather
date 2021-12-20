import React, { useState } from 'react';
import "./styles.css"
import Menu from "../menuApi"
import MenuCard from "./menuCard"
import Navbar from "./Navbar"

const uniqueList =[...new Set(Menu.map((currEle)=> currEle.category)),"All"] 

const Resturant = () => {
    const [menuData, setMenuData] = useState(Menu);  
    const [menuList, setMenuList] = useState(uniqueList);

    const filterItem = (category) => {
        if(category === "All"){
            setMenuData(Menu);
            return;
        }
        const updatedList = Menu.filter((currEle)=>{
            return currEle.category === category;
        });
        setMenuData(updatedList);
    }
    return <>
        <Navbar filterItem={filterItem} menuList = {menuList}/>
        <MenuCard menuData={menuData}/>
    </>
};

export default Resturant
