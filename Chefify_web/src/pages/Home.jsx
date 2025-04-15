import React, { useState } from "react";
import Navbar from '../components/Navbar'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Dishes from '../components/Dishes'
import Editor from "../components/Editor";
import { INITIAL_CONTACTS } from "../data/data";
import { INITIAL_CONTACTS2 } from "../data/data2";
import { INITIAL_CONTACTS3 } from "../data/data3";
const Home = () => {
    // // Initialize the state with the contact list
    const [dishes, setDishes] = useState(INITIAL_CONTACTS);
    const [dishes2, setDishes2] = useState(INITIAL_CONTACTS2);
    const [editor, setEditor] = useState(INITIAL_CONTACTS3);
    const title = "This Summer Recipes";
    const titlep = "We have all your Independence Day sweets covered";
    const title2 = "Recipes With Videos";
    const titlep2 = "We have all your Independence Day sweets covered";
    return (
        <div>
            <Navbar></Navbar>
            <Content></Content>
            <Dishes dishes={dishes} title={title} titlep={titlep}></Dishes>
            <Dishes dishes={dishes2} title={title2} titlep={titlep2}></Dishes>
            {/* <Editor editors={editor}></Editor> */}
            <Footer></Footer>
        </div>
    )
}

export default Home