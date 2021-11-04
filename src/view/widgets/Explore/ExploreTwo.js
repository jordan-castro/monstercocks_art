import RouteHandler, { Routes } from "../../../utils/route_handler";
import { CockCardExploreFour } from "../cocks/cock_card";

const ExploreTwo = (props) => {
    // Busca los cocks, y initData del props
    const { cocks, initData, pageNumber, query } = props;

    return (
        <section className="explore-area" style={{
            marginBottom: "-100px"
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>{initData.preHeading}</span>
                                <h3 className="mt-3 mb-0">{initData.heading}</h3>
                            </div>
                            <div className="intro-btn">
                                <a
                                    className="btn content-btn"
                                    href={RouteHandler.goToNextPage(Routes.COCKS, {
                                        key: "pn",
                                        value: pageNumber + 1
                                    }, query)}
                                >
                                    {initData.btnText}
                                </a>
                            </div>
                            {/* `/cocks?pn=${pageNumber + 1}` */}
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {cocks.map((item, idx) =>
                        <CockCardExploreFour cock={item} key={`exf_${idx}`} />
                    )}
                </div>
            </div>
        </section>
    );
}

export default ExploreTwo;