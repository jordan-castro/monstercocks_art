import { CockCardExploreFour } from "../cocks/cock_card";

const ExploreTwo = (props) => {
    // Busca los cocks, y initData del props
    const { cocks, initData, pageNumber } = props;

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
                                <a className="btn content-btn" href={`/cocks?pn=${pageNumber + 1}`}>{initData.btnText}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {cocks.map((item, idx) =>
                        <CockCardExploreFour idx={idx} cock={item} />
                    )}
                </div>
            </div>
        </section>
    );
}

export default ExploreTwo;