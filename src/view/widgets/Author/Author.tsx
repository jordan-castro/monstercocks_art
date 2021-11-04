import React, { Component, useState } from 'react';
import { fetchAuthor } from '../../../controller/fetch_author';
import { fetchCocksByOwner } from '../../../controller/fetch_cocks';
import AuthorProfile from '../AuthorProfile/AuthorProfile';
import Explore from '../Explore/ExploreSix';
import PageNumbers from '../PageNumbers/PageNumbers';
import pageAmount from '../../../utils/page_amount';
import { useWeb3React } from "@web3-react/core";
import AuthorData from '../../../models/author';
import MonsterCock from '../../../models/cock';
import { OWNER_ROUTE } from '../../../utils/globals';

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

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

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
        if (account == author?.address) {
            setEdit(true);
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
                        href={`${OWNER_ROUTE}${props.address}?`}
                    />
                }
            </div>
        </section>
    );
}

export default Author;