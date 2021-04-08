import React from 'react'
import '../style/Home.scss'


import NavHeader from '../NavHeader';

const Home = () => {

    return (
        <div>
            <NavHeader />
            <div className="home__container">
                <div className="home__wrapper">
                    <h1 className="wrapper__slogan">Hard to find ingredients? No Worries</h1>
                    <p> Herbs, extract, flour, we got it all covered</p>
                </div>
            </div>
        </div>
    )
}

export default Home