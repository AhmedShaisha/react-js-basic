import React, { Component } from 'react';
import { Container, Row , Col } from 'reactstrap';
import '../App.css';
import {Animated} from "react-animated-css";
import { FaUserAlt, FaMapMarkerAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Header from '../component/Header';

import axios from 'axios';

class Details extends Component {
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

        console.log('id parms',this.props.location.id);

        axios.get(`https://alaaelden.aait-sa.com/api/BlogDetails`, {
            data: {
                id  : this.props.location.id
            }
        })
            .then(res => {
                this.setState({ items : res.data.data, isLoading : false });
                console.log('datetr ===== ', res.data)
            });

    }

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


            </div>

        )
    }
}

export default Details;
