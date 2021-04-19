import React from 'react'
import '../style/Home.scss'


import NavHeader from '../NavHeader';

const Home = () => {
    return (
        <div>
            <NavHeader />
            <div className="home__container">
                <div className="home__wrapper">
                    <h1 className="home__slogan">Hard to find ingredients? No Worries</h1>
                    <h1 className="home__slogan__description"> Herbs, extract, flour, we got it all covered</h1>
                </div>
            </div>
        </div>
    )
}

export default Home