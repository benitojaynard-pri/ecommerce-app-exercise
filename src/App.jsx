import React, { Component, useState } from "react";
import Counter from "./components/Counter";
import "bootstrap/dist/css/bootstrap.css";
import Counters from "./components/Counters";
import NavBar from "./components/NavBar";
import products from "./components/Products";
import Main from "./Main";

// export default class App extends Component {
//   state = {
//     counters: [
//       { id: 1, value: 0 },
//       { id: 2, value: 0 },
//       { id: 3, value: 0 },
//     ],
//      counters2:[]
//   };

//   handleDelete = (id) => {
//     this.setState({
//       counters: this.state.counters.filter((counter) => counter.id !== id),
//     });
//   };

//   handleIncrement = (id) => {
//     // this.state.count++;

//     this.setState({
//       counters: this.state.counters.map((counter) => {
//         if (counter.id === id) {
//           return { ...counter, value: counter.value + 1 };
//         }
//         return counter;
//       }),
//     });
//     // console.log("count", this.state.count);
//   };

//   handleDecrement = (id) => {
//     // this.state.count++;
//     this.setState({
//       counters: this.state.counters.map((counter) => {
//         if (counter.id === id) {
//           return { ...counter, value: counter.value - 1 };
//         }
//         return counter;
//       }),
//     });

//     // console.log("count", this.state.count2);
//   };

//   getCountersWithValueLength = () => {
//     return this.state.counters.filter((counter) => counter.value > 0).length;
//   };

//   render() {
//     return (
//       <div>
//         <NavBar totalCount={this.getCountersWithValueLength()}></NavBar>
//         <div className="container">
//           <Counters
//             counters={this.state.counters}
//             onIncrement={this.handleIncrement}
//             onDecrement={this.handleDecrement}
//             onDelete={this.handleDelete}>
//             Hello
//           </Counters>
//         </div>
//       </div>
//     );
//   }
// }

function App() {
  const [cartItems, setCartItems] = useState([]);

  // This is the function you will pass to your Product components
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  return (
    <div className="App">
      {/* Pass the total count to Navbar */}
      <NavBar countCartItems={cartItems.length} />
      
      <div className="row">
        {/* Pass the products data and the onAdd function to your Main component */}
        <Main products={products} onAdd={onAdd} />
      </div>
    </div>
  );
}

export default App;
