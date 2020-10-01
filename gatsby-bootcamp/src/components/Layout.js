import React from 'react'
import Footer from "./footer";
import Header from "./header";
import '../styles/index.css';

export const Layout = (props) => { // TODO, how do props work here?
    return (
        <div>
            <Header />
            {props.children} 
            <Footer />
        </div>
    )
}
