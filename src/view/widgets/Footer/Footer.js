const socialLinks = [
    {
        link: "https://twitter.com/MonsterCocksArt",
        icon: "fab fa-twitter"
    },
    {
        link: "https://github.com/james-garfield/Monster-Cock-Builder",
        icon: "fab fa-github"
    },
    {
        link: "https://discord.gg/dAWr5HbcU6",
        icon: "fab fa-discord"
    }
];
const usefulLinks = [
    {
        text: "All MCKs",
        link: "/cocks"
    },
    {
        text: "All Owners",
        link: "/owners"
    },
    {
        text: "Privacy & Terms",
        link: "/privacy"
    }
];
const communityLinks = [
    {
        text: "Opensea",
        link: "https://opensea.io/collection/monstercocks"
    },
    {
        text: "Polygon Scan",
        link: "https://polygonscan.com/address/0x8F8b452E4B9951C7eAB9ebb1Fc897f9F0d597f15"
    }
];

const Footer = (props) => {
    return (
        <footer className="footer-area">
            {/* Footer Top */}
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Logo */}
                                <a className="navbar-brand" href="/">
                                    <img src="img/monstercocks.png" alt="" />
                                </a>
                                <p>MonsterCocks is all about ...</p>
                                {/* Social Icons */}
                                <div className="social-icons d-flex">
                                    {socialLinks.map((item, idx) => {
                                        return (
                                            <a key={`sd_${idx}`} href={item.link} target="_blank">
                                                <i className={item.icon} />
                                                <i className={item.icon} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">Useful Links</h4>
                                <ul>
                                    {usefulLinks.map((item, idx) => {
                                        return (
                                            <li key={`wdo_${idx}`}><a href={item.link}>{item.text}</a></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3 res-margin">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">Community</h4>
                                <ul>
                                    {communityLinks.map((item, idx) => {
                                        return (
                                            <li key={`wdo_${idx}`}><a href={item.link} target="_blank">{item.text}</a></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            {/* Footer Items */}
                            <div className="footer-items">
                                {/* Footer Title */}
                                <h4 className="footer-title">Subscribe to the Newsletter</h4>
                                {/* Subscribe Form */}
                                <div className="subscribe-form d-flex align-items-center">
                                    <input type="email" className="form-control" placeholder="info@yourmail.com" />
                                    <button type="submit" className="btn"><i className="icon-paper-plane" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {/* Copyright Area */}
                            <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                {/* Copyright Left */}
                                <div className="copyright-left">©2021 MonsterCocks, All Rights Reserved.</div>
                                {/* Copyright Right */}
                                {/* <div className="copyright-right">Made with <i className="fas fa-heart" /> By <a href="#">Themeland</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;