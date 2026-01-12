import React, { Component } from "react";
import Counter from "./Counter";

export default class Counters extends Component {
  constructor() {
    super();
    console.log("enter constructor");
  }

  componentDidMount() {
    console.log("did mount");
    this.props.onIncrement(1);
  }
  componentWillUnmount() {
    console.log("unmount");
  }

  componentDidUpdate() {
    console.log("update");
  }
  render() {
    // const props = this.props;
    // console.log("props", props);
    const { counters, onDelete, onIncrement, onDecrement } = this.props;
    console.log("counters", counters);
    return (
      <div>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
          />
        ))}
        {/* <Counter />
        <Counter />
        <Counter /> */}
      </div>
    );
  }
}
