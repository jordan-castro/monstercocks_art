import {
    Switch,
    Route,
} from "react-router-dom";
import ExploreCocksPage from "./pages/cocks_pages";
import { CockPage } from "./pages/cock_page";
import EditPage from "./pages/edit_page";
import Home from "./pages/home_page";
import AuthorPage from "./pages/author_page";


export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/cock/:id' component={CockPage}></Route>
            <Route exact path='/cocks' component={ExploreCocksPage}></Route>      
            <Route exact path='/edit' component={EditPage}></Route>
            <Route exact path='/author/:address' component={AuthorPage}></Route>   
        </Switch>
    );
}