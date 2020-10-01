import React from 'react'
import Footer from "./footer";
import Header from "./header";
import '../styles/index.scss';
import layoutStyle from './layout.module.scss';

export const Layout = (props) => { // TODO, how do props work here?
    return (
        <div className={layoutStyle.container}>
            <div className={layoutStyle.content}>
                <Header />
                {props.children} 
            </div>
            <Footer />
        </div>
    )
}
