import MonsterCock from '../../../models/cock';
import { Loader } from '../loader';

const ExploreSix = (props: {
    cocks: MonsterCock[],
    amount?: number
}) => {
    const { cocks, amount } = props;

    return (
        <div>
            {/* <div className="row justify-content-center text-center mt-5 mt-lg-0">
                <div className="col-12">
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
            </div> */}
            <div className="col-12">
                <div className="row justify-content-center text-center mt-3 mt-lg-0">
                    <h4>{amount ? `${amount} Cocks` : 'Cocks'}</h4>
                </div>
            </div>
            <div className="row items">
                {cocks.map((item, idx) => {
                    return (
                        <div key={`eds_${idx}`} className="col-12 col-md-6 item explore-item" data-grou={"all"}>
                            <div className="card text-center">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ExploreSix;