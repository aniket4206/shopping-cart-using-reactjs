import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Realme",
                "src": "https://st1.bgr.in/wp-content/uploads/2021/03/vivo-x60-2.jpg",
                "description": "1 Year for Handset, 6 Months for Accessories",
                "content": "1 Year Warranty on Handset, 6 Months on Charger and 3 Months on Data Cable Provided by the Manufacturer from Date of Purchase.",
                "price": 9000,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Oppo",
                "src": "https://images-eu.ssl-images-amazon.com/images/I/41ksesyGr%2BL._SX300_SY300_QL70_ML2_.jpg",
                "description": "UPowerful to the Core",
                "content": "1 Year Warranty on Handset, 6 Months on Charger and 3 Months on Data Cable Provided by the Manufacturer from Date of Purchase.",
                "price": 7000,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Iphone",
                "src": "https://www.thechennaimobiles.com/image/cache/catalog/f19p-slr-600x600.jpg",
                "description": "48MP + 8MP + 5MP + 2MP | 16MP Front Camera",
                "content": "1 Year Warranty on Handset, 6 Months on Charger and 3 Months on Data Cable Provided by the Manufacturer from Date of Purchase.",
                "price": 9000,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Oneplus",
                "src": "https://images-na.ssl-images-amazon.com/images/I/71bp9IpcK-L._SX522_.jpg",
                "description": "5000 mAh Lithium-ion Polymer Battery",
                "content": "1 Year Warranty on Handset, 6 Months on Charger and 3 Months on Data Cable Provided by the Manufacturer from Date of Purchase.",
                "price": 15000,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Xiomi",
                "src": "https://www.mymobileindia.com/wp-content/uploads/2020/09/redmi-9i-front-500x500.jpg",
                "description": "4 GB RAM | 64 GB ROM | Expandable Upto 512 GB",
                "content": "1 Year Warranty on Handset, 6 Months on Charger and 3 Months on Data Cable Provided by the Manufacturer from Date of Purchase.",
                "price": 8000,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "LAVA",
                "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR13NULGaubiLDgQl2TgmiuE9g2iVWVYpZzhQ&usqp=CAU",
                "description": "6 GB RAM | 64 GB ROM | Expandable Upto 512 GB",
                "content": "1 Year Warranty on Handset, 6 Months on Charger and 3 Months on Data Cable Provided by the Manufacturer from Date of Purchase.",
                "price": 10000,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count =1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };
    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count +=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
        const {cart} = this.state;
        cart.forEach((item, index) =>{
            if(item._id === id){
                cart.splice(index, 1)
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    }
     };
   
     getTotal = id =>{
         const{cart} = this.state;
         const res = cart.reduce((prev, item) => {
             return prev + (item.price * item.count);
         },0)
         this.setState({total: res})
     };
    
     componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    };

    render() {
        const {products, cart, total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider value={{products, addCart, cart, reduction, increase, removeProduct, total, getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}



