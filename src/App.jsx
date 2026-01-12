import React, { Component, useState } from "react";
import Counter from "./components/Counter";
import "bootstrap/dist/css/bootstrap.css";
import Counters from "./components/Counters";
import NavBar from "./components/NavBar";

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

const App = () => {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
  ]);
  const [paymentPage, setPaymentPage] = useState(false);

  const handleDelete = (id) => {
    setCounters((prevState) =>
      prevState.filter((counter) => counter.id !== id)
    );
  };

  const handleIncrement = (id) => {
    setCounters((prevState) =>
      prevState.map((counter) => {
        if (counter.id === id) {
          return { ...counter, value: counter.value + 1 };
        }
        return counter;
      })
    );
  };

  const handleDecrement = (id) => {
    setCounters((prevState) =>
      prevState.map((counter) => {
        if (counter.id === id) {
          return { ...counter, value: counter.value - 1 };
        }
        return counter;
      })
    );
  };

  const handleTogglePage = () => {
    setPaymentPage((prevState) => !prevState);
  };

  const getCountersWithValueLength = () => {
    return counters.filter((counter) => counter.value > 0).length;
  };

  return (
    <div>
      <NavBar
        onTogglePage={handleTogglePage}
        totalCount={getCountersWithValueLength()}></NavBar>

      {paymentPage ? (
        <div>
          <h1>Payment Page</h1>
        </div>
      ) : (
        <div className="container">
          <Counters
            counters={counters}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onDelete={handleDelete}>
            Hello
          </Counters>
        </div>
      )}
    </div>
  );
};

export default App;
