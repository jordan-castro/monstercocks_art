import {
    Switch,
    Route,
} from "react-router-dom";
import ExploreCocksPage from "./cocks_pages";
import { CockPage } from "./cock_page";
import Home from "./home_page";


export default function AppRouter() {
    return (
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/cock/:id' component={CockPage}></Route>
            <Route exact path='/cocks' component={ExploreCocksPage}></Route>            
        </Switch>
    );
}