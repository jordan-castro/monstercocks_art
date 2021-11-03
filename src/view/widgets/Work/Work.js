import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/work";

const WorkChild = (props) => {
    const { icon, title, text, idx } = props;
    return (
        <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
            <i className={icon} />
            <h4>{title}</h4>
            <p>{text}</p>
        </div>
    );
}

class Work extends Component {
    state = {
        data: {},
        workData: []
    }
    componentDidMount() {
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    workData: res.data.workData
                })
                // console.log(this.state.data)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="work-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro mb-4">
                                <div className="intro-content">
                                    <span>How It Works</span>
                                    <h3 className="mt-3 mb-0">The MonsterCock Process</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        <WorkChild
                            icon="icons icon-grid text-effect"
                            title="Birth"
                            text="Each MonsterCock is built uniquely. A MonsterCock is built completely randomly, and can have up to 14 unique attributes."
                            idx={1}
                        />
                        <WorkChild
                            icon="icons icon-drawer text-effect"
                            title="Upload"
                            text="Then the MCK is uploaded to the Smart Contract. At this point it is fully ready to go."
                            idx={2}
                        />
                        <WorkChild
                            icon="icons icon-bag text-effect"
                            title="Shop"
                            text="Now anyone can get their hands on any Monster Cocks that are for sale."
                            idx={3}
                        />
                        <WorkChild
                            icon="icons icon-wallet text-effect"
                            title="View"
                            text="Explore all the MCK NFTs you or anybody else owns on Monstercocks.art!"
                            idx={4}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;