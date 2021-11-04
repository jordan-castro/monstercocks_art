import React from 'react';
import { fetchMostRecentCocks, fetchRandomCocks } from '../../../controller/fetch_cocks';
import MonsterCock from '../../../models/cock';
import { CockCardExploreFour } from '../cocks/cock_card';
import Slider from "react-slick";

class AuctionsOne extends React.Component<{}, {
    cocks?: MonsterCock[],
    loading: boolean,
    error: boolean
}> {
    private initData = {
        pre_heading: "Recent",
        heading: "Most Recent MonsterCocks",
        btnText: "View All"
    }
    private sliderSettings = {
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }

            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    }

    constructor(props: any) {
        super(props);
        this.state = {
            cocks: [],
            loading: true,
            error: false
        }
    }

    /**
     * Busca los cocks de la API por Random.
     */
    getCocks = async () => {
        let cocks = await fetchMostRecentCocks();
        if (cocks.length > 0) {
            this.setState({
                cocks: cocks,
                loading: false,
                error: false
            });
        } else {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    componentDidMount() {
        this.getCocks();
    }

    render() {
        return (
            <section className="live-auctions-area">
                <div className="container">
                    <div className="row" style={{marginBottom: "20px"}}>
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>{this.initData.pre_heading}</span>
                                    <h3 className="mt-3 mb-0">{this.initData.heading}</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn" href="/cocks">{this.initData.btnText}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Single Slide */}
                    {this.state.cocks &&
                        <>
                            <Slider {...this.sliderSettings}>
                                {this.state.cocks.map((item, idx) => {
                                    return (
                                        <CockCardExploreFour
                                            cock={item}
                                            idx={idx}
                                            slider={true}
                                        />
                                    );
                                })}
                            </Slider>
                        </>
                    }
                </div>
            </section>
        );
    }
}

export default AuctionsOne;