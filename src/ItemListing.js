import React from 'react';
import './App.css';
import {products} from './products';
import {Link} from 'react-router-dom';

export default class ItemListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedItems: '',
        }
    }
    
    searchItem = (e) => {
        let item  = e.target.value;
        this.setState({searchedItems: item});
    }
    addItemToCart = (e) => {
        let allItemsInCart = localStorage.getItem('cartItems');
        let json = JSON.parse(allItemsInCart);
        if(json[e.target.id] === undefined) {
            json[e.target.id] = 1;
        }
        else {
            json[e.target.id] = json[e.target.id]+1;
        }
        localStorage.setItem('cartItems', JSON.stringify(json));
        if(this.props.refreshMenu !== undefined) {
            this.props.refreshMenu();
        }
    }
    renderitemList = () => {
        const itemList = products;
        const {searchedItems} = this.state;
        let allItems = itemList.map( (key, value) => {
            let item = key.name.toLowerCase().trim();
            return (
                <div className="itemsBlock" key={key.id}>
                    {
                        searchedItems.length > 0 && item.includes(searchedItems.trim().toLowerCase()) === true 
                        ? 
                        <div className="bold" key={key.id}>{key.name}</div> 
                        :
                        <div key={key.id}>{key.name}</div>
                    }
                    <button id={key.id} onClick={this.addItemToCart}>Add to cart</button>
                </div>
            );
        });
        return allItems;
    }
    render() {
        return(
            <div className={ (this.props.fromCart === undefined) ? 'body': ''}>
                {this.props.fromCart === undefined ? <div><Link  to="/cart">Cart</Link></div>: ''}
                <div className="searchBox">
                    {
                        this.props.fromCart === undefined
                        ?
                        <input type="search" id="searchItem" placeholder="Search Items" onKeyUp={this.searchItem}/>
                        :
                        ''
                    }
                    {
                        this.renderitemList()
                    }
                </div>
            </div>
        );
    }
}