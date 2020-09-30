import React from 'react';
import Footer from "./components/footer";
import Header from "./components/header";

const ContactPage = () => {
    return (
        <div>
            <Header />
            <h1>Contact</h1> 
            <p>Email: huangwaleking@gmail.com</p>
            <p>And the best way to reach me is via <a href="https://twitter.com/huang_waleking" target="_blank">@huang_waleking</a> on Twitter.</p>
            <Footer />
        </div>
    )
}

export default ContactPage;