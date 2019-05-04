import React from 'react';
import {products} from './products';
import {Link} from 'react-router-dom';
import ItemListing from './ItemListing';
export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
        }
    }
    removeItemFromCart = (e) => {
        let addedItems = JSON.parse(localStorage.getItem('cartItems'));
        delete addedItems[e.target.id];
        localStorage.setItem('cartItems',JSON.stringify(addedItems));
        this.setState({refresh: !this.state.refresh});
    }
    refreshMenu = () => {
       this.setState({refresh: !this.state.refresh});
    }
    renderSelectedProducts = () => {
        let addedItems = JSON.parse(localStorage.getItem('cartItems'));
        let allProducts = products.map( (key, value) => {
            if (addedItems[key.id] !== undefined) {
                return(
                    <div key={key.id} className="cartItems">
                        <span>{key.name}</span>
                        <span><input type="text" id={key.id} value={`Quantity `+addedItems[key.id]} disabled={true} min="0" onChange={this.changeQuantity}/></span>
                        <span><button id={key.id} onClick={this.removeItemFromCart}>Remove</button></span>
                    </div>
                )
            }
            return '';
        });
        return allProducts;
    }
    render() {
        return(
            <div className="cartArea">
                <div><Link to="/">Go back to item list</Link></div>
                <h4>Items in cart</h4>
                {
                    this.renderSelectedProducts()
                }
                <hr/>
                <ItemListing
                    refreshMenu = {this.refreshMenu.bind(this)}
                    fromCart = {true}
                />
            </div>
        )
    }
}