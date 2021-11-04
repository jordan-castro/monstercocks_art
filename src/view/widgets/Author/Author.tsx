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

    useEffect(() => {
        // Fetch author data
        getAuthor();
        // Fetch cocks
        getCocks();
        // Chequea usario
        checkUser();
    });

    // author?: AuthorData,
    // edit: boolean,
    // amount: number,
    // cocks: MonsterCock[],
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         cocks: [],
    //         amount: 0,
    //         edit: false
    //     }

    //     this.getCocks = this.getCocks.bind(this);
    //     this.getAuthor = this.getAuthor.bind(this);
    //     this.checkUser = this.checkUser.bind(this);
    // }

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
        setCocks(cocks);
        setAmount(amount);
    }

    const getAuthor = async () => {
        // Busca el author
        const author = await fetchAuthor(props.address);
        if (author) {
            setAuthor(author);
        }
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
                        {author &&
                            <AuthorProfile author={author} editMode={edit} />
                        }
                    </div>
                    <div className="col-12 col-md-8">
                        <Explore
                            cocks={cocks ? cocks : []}
                            amount={amount}
                        />
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