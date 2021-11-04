import './PageNumbers.css';

class PageNumbersProps {
    amountOfPages: number;
    currentPage: number;
    // A function that gets called when a page number is clicked
    onPageNumberClicked = (pageNumber: number) => {
        console.log(`Page number ${pageNumber} clicked`);
        return '';
    };

    constructor(amountOfPages: number, currentPage: number, onPageNumberClicked: (pageNumber: number) => string) {
        this.amountOfPages = amountOfPages;
        this.currentPage = currentPage;
        this.onPageNumberClicked = onPageNumberClicked;
    }
}

export default function PageNumbers(props: PageNumbersProps) {
    console.log(props.currentPage);

    // Crea los objectos de la pagina numeros
    const createPageButtons = (props) => {
        let pageButtons: JSX.Element[] = [];
        for (let i = 1; i <= props.amountOfPages; i++) {
            pageButtons.push(
                <a
                    key={`_page_${i}`}
                    href={props.onPageNumberClicked(i)}
                    className={props.currentPage == i ? "page-numbers-active" : "page-numbers"}
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