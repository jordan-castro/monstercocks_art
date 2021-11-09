import React from "react";
import AuctionsOne from "../widgets/Auctions/AuctionsOne";
import Collections from "../widgets/Collections/Collections";
import ExploreOne from "../widgets/Explore/ExploreOne";
import Footer from "../widgets/Footer/Footer";
import Header from "../widgets/Header/Header";
import Hero from "../widgets/Hero/Hero";
import ModalMenu from "../widgets/Modal/ModalMenu";
import ModalSearch from "../widgets/Modal/ModalSearch";
import Scrollup from "../widgets/Scrollup/Scrollup";
import Work from "../widgets/Work/Work";

export default function Home() {
    return (
        <div className="main">
            <Header />
            <Hero />
            <AuctionsOne />
            <Collections />
            <Work />
            <Footer />
            <ModalSearch />
            <ModalMenu />
            <Scrollup />
        </div>
    );
}