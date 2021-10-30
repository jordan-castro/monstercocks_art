import React from 'react';
import MonsterCock from '../../../models/cock';

class ExploreSix extends React.Component<{
    cocks: MonsterCock[],
    amount?: number
}>{
    render() {
        return (
            <div>
                <div className="row justify-content-center text-center mt-5 mt-lg-0">
                    <div className="col-12">
                        {/* Explore Menu */}
                        <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                            <label className="btn active d-table text-uppercase p-2">
                                <input type="radio" defaultValue="all" defaultChecked className="explore-btn" />
                                <span>Filter 1</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="art" className="explore-btn" />
                                <span>Filter 2</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="music" className="explore-btn" />
                                <span>Filter 3</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="collectibles" className="explore-btn" />
                                <span>Filter 4</span>
                            </label>
                            <label className="btn d-table text-uppercase p-2">
                                <input type="radio" defaultValue="sports" className="explore-btn" />
                                <span>Filter 5</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row items explore-items">
                    {this.props.cocks.map((item) => {
                        return (
                            // TODO pon data-group
                            <div key={`eds_${item.id}`} className="col-12 col-md-6 item explore-item" data-grou={"all"}>
                                <div className="card no-hover text-center">
                                    <div className="image-over">
                                        <a href={`/cock/${item.id}`}>
                                            <img className="card-img-top" src={item.image} alt="" />
                                        </a>
                                        {/* Author */}
                                        {/* <a className="author" href="/authors">
                                        <div className="author-thumb avatar-lg">
                                            <img className="rounded-circle" src={item.author} alt="" />
                                        </div>
                                    </a> */}
                                    </div>
                                    {/* Card Caption */}
                                    <div className="card-caption col-12 p-0">
                                        {/* Card Body */}
                                        <div className="card-body mt-4">
                                            <a href={`/cock/${item.id}`}>
                                                <h5 className="mb-2">{item.name}</h5>
                                            </a>
                                            {/* <span>{item.content}</span> */}
                                            <hr />
                                            <div className="card-bottom d-flex justify-content-between">
                                                {/* <span>{item.price}</span> */}
                                                <span><i className="icon-heart mr-2" />50</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div >
        );
    }
}

export default ExploreSix;