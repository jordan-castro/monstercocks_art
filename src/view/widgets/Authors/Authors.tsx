import { Component } from 'react';
import Owner from '../../../models/owner';
import AuthorData from '../../../models/author';
import { fetchAuthors } from '../../../controller/fetch_activity';
import { Loader } from '../loader';
import RouteHandler from '../../../utils/route_handler';
import { safeAuthorName, safeImage } from '../../../utils/get_safe';
import { SocialIcon } from '../AuthorProfile/AuthorProfile';

class Authors extends Component<{
    pageNumber: number,
    onAmountLoad: (amount: number) => void,
}, {
    people?: { owner: Owner, author: AuthorData }[],
    loading: boolean,
    error: boolean,
    amount: number
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            amount: 0
        };
    }

    /**
     * Carga la data de los autores.
     */
    loadData = async () => {
        // Busca los sellers
        const result = await fetchAuthors(this.props.pageNumber - 1);

        this.props.onAmountLoad(result.amount);

        // Chequea resulta
        if (result.amount == 0) {
            this.setState({
                loading: false,
                error: true
            });
        } else {
            // Todo esta bien!
            this.setState({
                people: result.data,
                loading: false,
                error: false,
                amount: result.amount,
            });
        }
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <section className="popular-collections-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>Owners</span>
                                <h3 className="mt-3 mb-0">MonsterCock Owners</h3>
                                <p>A list of every current MonserCock owner!</p>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {this.state.loading ? <Loader /> :
                            this.state.error ? <div>Error</div> :
                                // Si no esta cargando y no tiene error entonces muestra este pendejo
                                this.state.people?.map((item, idx) => {
                                    return (
                                        <div key={`ad_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                                            <div className="card no-hover text-center">
                                                <div className="image-over">
                                                    <a href={RouteHandler.getOwnerUrl(item.author.address)}>
                                                        <img className="card-img-top" src={safeImage(item.author.image)} alt="" />
                                                    </a>
                                                    {/* Seller */}
                                                    <a className="seller" href={RouteHandler.getOwnerUrl(item.owner.address)}>
                                                        <div className="seller-thumb avatar-lg">
                                                            <img className="rounded-circle" src={safeImage(item.author.image)} alt="" />
                                                        </div>
                                                    </a>
                                                </div>
                                                {/* Card Caption */}
                                                <div className="card-caption col-12 p-0">
                                                    {/* Card Body */}
                                                    <div className="card-body mt-4">
                                                        <a href={RouteHandler.getOwnerUrl(item.owner.address)}>
                                                            <h5>{safeAuthorName(item.author.address, item.author.name)}</h5>
                                                        </a>
                                                        <div className="social-icons d-flex justify-content-center my-3">
                                                            {
                                                                item.author.twitter && <SocialIcon href={item.author.twitter} social="Twitter" icon="fab fa-twitter" />
                                                            }
                                                            {
                                                                item.author.instagram && <SocialIcon href={item.author.instagram} social="Instagram" icon="fab fa-instagram" />
                                                            }
                                                            {
                                                                item.author.facebook && <SocialIcon href={item.author.facebook} social="Facebook" icon="fab fa-facebook-f" />
                                                            }
                                                            {
                                                                item.author.github && <SocialIcon href={item.author.github} social="Github" icon="fab fa-github" />
                                                            }
                                                        </div>

                                                        <a className="btn btn-bordered-white btn-smaller" href={RouteHandler.getOwnerUrl(item.owner.address)}>
                                                            <i className="icon-eye mr-2" />
                                                            View
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Authors;