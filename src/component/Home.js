import React, { Component } from 'react';
import { Container, Row , Col } from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import { FaUserAlt, FaMapMarkerAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Header from '../component/Header';

import { Link } from 'react-router-dom';

import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isLoading           : true,
            items               : [],
            sliders             : [],
            options             : {
                loop        : true,
                margin      : 10,
                center      : true,
                autoplay    : true,
                autoplayTimeout : 2000,
                animateOut      : 'fadeInUp',
                animateIn       : 'fadeInDown',
                smartSpeed      : 2000,
                dragEndSpeed    : 2000,
                pagination      : true,
                nav             : true,
                responsive      :{
                    0       : {
                        items: 1,
                    },
                    600     : {
                        items: 1,
                    },
                    1000    : {
                        items: 1,
                    },
                },
            },
        };
    }

    componentDidMount() {
        axios.get(`https://alaaelden.aait-sa.com/api/get-blogs`)
            .then(res => {
                this.setState({ items : res.data.data, isLoading : false });
            });

        axios.get(`https://alaaelden.aait-sa.com/api/getSlider`)
            .then(res => {
                this.setState({ sliders : res.data.data});
            });

    }

    openDetails = (id) => {
        // this.props.history.push('/details', {id});
    };

    render() {

        if (this.state.isLoading === true) {
            return (
                <div className='loading'>
                    <img src={require('../imgs/loader.gif')} />
                </div>
            );
        }

        return (

            <div className="body_section">

                <Header />

                <Container>
                    <div className='slider_home'>
                        <OwlCarousel
                            className="owl-theme"
                            {...this.state.options}
                        >
                            {this.state.sliders.map(slide =>
                                <div className="item"><img src={slide.url}/></div>
                            )}
                        </OwlCarousel>
                    </div>
                </Container>

                <div className="content_view">
                    <Container>
                        <Row>
                            {this.state.items.map(item =>
                                <Col xs="6" sm="4">
                                    <Animated
                                        animationIn             = "fadeInUp"
                                        animationInDuration     = {1000}
                                        animationOutDuration    = {1000}
                                        isVisible               = {true}
                                    >
                                        <Link to={{pathname: '/details/'+ item.id, id: {id: item.id}}} className="nav-link">
                                        <div className="section_e3lan">
                                            <div className="img_e3lan">
                                                <img src={ item.img } />
                                                <p>{ item.date }</p>
                                            </div>
                                            <div className="block_e3lan">
                                                <h4>{ item.title }</h4>
                                                <p>{ item.description }</p>
                                                <h6>
                                                    <span><FaUserAlt /> { item.user } </span>
                                                    <span><FaMapMarkerAlt />  { item.date } </span>
                                                </h6>
                                            </div>
                                        </div>
                                        </Link>
                                    </Animated>
                                </Col>
                            )}
                        </Row>
                    </Container>
                </div>

                <div className="pagintion">
                    <ul>
                        <li><FaAngleDoubleRight /></li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li><FaAngleDoubleLeft /></li>
                    </ul>
                </div>

            </div>

        )
    }
}

export default Home;
