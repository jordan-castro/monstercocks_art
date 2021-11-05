import React, { Component, useEffect, useState } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { fetchCocksByOwner } from '../../../controller/fetch_cocks';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Explore from '../Explore/ExploreSix';
import PageNumbers from '../PageNumbers/PageNumbers';
import pageAmount from '../../../utils/page_amount';
import AuthorData from '../../../models/author';
import MonsterCock from '../../../models/cock';
import RouteHandler, { Routes } from '../../../utils/route_handler';
import { grabWallet, isConnected } from '../../../utils/connect_wallet';
import { Loader } from '../loader';

class AuthorProps {
    startingPage: number;
    address: string;

    constructor(startingPage: number, address: string) {
        this.startingPage = startingPage;
        this.address = address;
    }
}

const Author = (props: AuthorProps) => {
    const [author, setAuthor] = useState<AuthorData>();
    const [cocks, setCocks] = useState<MonsterCock[]>();
    const [amount, setAmount] = useState<number>(0);
    const [edit, setEdit] = useState<boolean>(false);
    const [authorLoading, setAuthorLoading] = useState<boolean>(true);
    const [cocksLoading, setCocksLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log('Author: useEffect');
        // Chequea si todivia no existe un author
        if (!author) {
            console.log('Author: useEffect: fetchAuthor');
            // Fetch author data
            getAuthor();
        }
        // Chequea si todivia no existe los cocks
        if (!cocks) {
            console.log('Author: useEffect: fetchCocks');
            // Fetch cocks
            getCocks();
        }
        // Chequea usario
        checkUser();
    });

    // Chequea el usario currentamente logueado
    // Si es el mismo usuario que el que se esta viendo, se muestra el boton de editar
    // Si no, no se muestra
    const checkUser = async () => {
        // Chequea el wallet esta connectado
        let wallet = await grabWallet();
        if (wallet) {
            if (wallet == author?.address) {
                setEdit(true);
            } else {
                setEdit(false);
            }
        } else {
            setEdit(false);
        }
    }

    // Busca los cocks del address
    const getCocks = async () => {
        const { cocks, amount } = await fetchCocksByOwner(props.address, props.startingPage - 1);
        console.log(cocks);
        setCocks(cocks);
        setAmount(amount);
        setCocksLoading(false);
    }

    const getAuthor = async () => {
        // Busca el author
        const author = await fetchAuthor(props.address);
        if (author) {
            setAuthor(author);
        }
        setAuthorLoading(false);
    }

    // componentDidMount() {
    //     this.getCocks();
    //     this.getAuthor().then(() => {
    //         this.checkUser();
    //     });
    // }

    return (
        <section className="author-area explore-area popular-collections-area">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-md-4">
                        {/* Author Profile */}
                        {
                            authorLoading ? (
                                <div>
                                    <p>Loading author...</p>
                                    <Loader />
                                </div>
                            ) : (
                                author &&
                                <AuthorProfile author={author} editMode={edit} />
                            )
                        }
                    </div>
                    <div className="col-12 col-md-8">
                        {
                            cocksLoading ? (
                                <div className="">
                                    <p>Loading cocks...</p>
                                    <Loader />
                                </div>
                            ) : (
                                <Explore
                                    cocks={cocks ? cocks : []}
                                    amount={amount}
                                />
                            )
                        }
                    </div>
                </div>
                {/* Pagination */}
                {author &&
                    <PageNumbers
                        currentPage={props.startingPage}
                        amountOfPages={amount ? pageAmount(amount, 20) : 0}
                        onPageNumberClicked={(pageNumber) => {
                            return RouteHandler.goToNextPage(RouteHandler.getOwnerUrl(props.address), {
                                key: 'pn',
                                value: pageNumber
                            });
                        }}
                    // href={RouteHandler.getOwnerUrl(props.address)}
                    />
                }
            </div>
        </section>
    );
}

export default Author;