import {
    Switch,
    Route,
} from "react-router-dom";
import ExploreCocksPage from "./pages/cocks_pages";
import { CockPage } from "./pages/cock_page";
import EditPage from "./pages/edit_page";
import Home from "./pages/home_page";
import AuthorPage from "./pages/author_page";
import { Routes } from "../utils/route_handler";

export default function AppRouter() {
    return (
        <Switch>
            <Route exact path={Routes.HOME} component={Home}></Route>
            <Route exact path={Routes.COCK + ':id'} component={CockPage}></Route>
            <Route exact path={Routes.COCKS} component={ExploreCocksPage}></Route>
            <Route exact path={Routes.EDIT} component={EditPage}></Route>
            <Route exact path={Routes.OWNER + ':address'} component={AuthorPage}></Route>
        </Switch>
    );
}