import { BrowserRouter, Route, Switch } from "react-router-dom";

import Error from "../pages/Error";
import ListEmpresas from "../pages/ListEmpresas";
import NewEmpresa from "../pages/NewEmpresa";
import EditEmpresa from "../pages/EditEmpresa";
import ListSectores from "../pages/ListSectores";
import NewSector from "../pages/NewSector";
import EditSector from "../pages/EditSector";
import Main from "../pages/Main";
import Header from "./Header";

export default function Router() {

    return (
        <BrowserRouter>
            <Header />
            <Switch>

                <Route exact path="/empresas/new" component={NewEmpresa} />
                <Route exact path="/empresas/edit/:id" component={EditEmpresa} />
                <Route exact path="/empresas" component={ListEmpresas} />

                <Route exact path="/sectores/new" component={NewSector} />
                <Route exact path="/sectores/edit/:id" component={EditSector} />
                <Route exact path="/sectores" component={ListSectores} />

                <Route exact path="/" component={Main} />

                <Route component={Error} />
            </Switch>
        </BrowserRouter>
    )
}