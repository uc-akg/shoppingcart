import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';
import ItemLising from './ItemListing';
import Cart from './Cart';
export default class Root extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <Route exact path="/" component = {ItemLising}/>
                <Route
                    path="/cart"
                    component = {Cart}
                />
            </BrowserRouter>
        );
    }
}