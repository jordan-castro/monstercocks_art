import React from "react";
import Header from "../widgets/Header/Header";
import Hero from "../widgets/Hero/Hero";
import Work from "../widgets/Work/Work";

export default function Home() {
    return (
        <div className="main">
            <Header />
            <Hero />
            <Work />
        </div>
    );
}