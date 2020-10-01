import React from 'react'
import Footer from "./footer";
import Header from "./header";

export const Layout = (props) => { // TODO, how do props work here?
    return (
        <div>
            <Header />
            {props.children} 
            <Footer />
        </div>
    )
}
