import React from 'react'
import { Router, Switch, Route } from "react-router-dom"

import Cart from './Cart';

function Routes() {
    return (
        < Router >
            <Switch>
                <Route path="/cart" component={Cart} />
            </Switch>
        </Router>
    )
}

export default Routes
