import './PageNumbers.css';

class PageNumbersProps {
    amountOfPages: number;
    currentPage: number;
    href: string;

    constructor(amountOfPages: number, currentPage: number, href: string) {
        this.amountOfPages = amountOfPages;
        this.currentPage = currentPage;
        this.href = href;
    }
}

export default function PageNumbers(props: PageNumbersProps) {

    // Crea los objectos de la pagina numeros
    const createPageButtons = (props) => {
        let pageButtons: JSX.Element[] = [];
        for (let i = 1; i <= props.amountOfPages; i++) {
            pageButtons.push(
                <a
                    href={`${props.href}?pn=${i}`}
                    className={props.currentPage === i ? "page-numbers-active" : "page-numbers"}
                >
                    {i}
                </a>
            );
        }
        return pageButtons;
    }

    return (
        <div className="social-icons d-flex" style={{
            width: '100%',
            justifyContent: 'center',
            margin: '20px'
}}>
            {
                createPageButtons(props)
            }
        </div>
    );
}