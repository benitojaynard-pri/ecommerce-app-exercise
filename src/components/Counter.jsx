import React, { Component } from "react";

export default class Counter extends Component {
  // props

  // this.props - from parent down here

  //   name = "Hello World";
  //   state = {
  //     name: "Hello Wolrd",
  //     image: "http://picsum.photos/200",
  //     // count: 0,
  //     count2: 1,
  //     tags: ["tag1", "tag2", "tag3"],
  //   };

  constructor() {
    super();
  }

  getName() {
    return <h1>Big Name</h1>;
  }

  formatText() {
    if (this.props.counter.value > 0) {
      return this.props.counter.value;
    }
    return "Zero";
  }

  getClassName() {
    const { value } = this.props.counter; // If this.props.counter is missing, it crashes here!
    return value === 0 ? "badge-warning" : "badge-primary";
  }

  renderTags() {
    return (
      this.state.tags.length > 0 && (
        <ul>
          {this.state.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )
    );
  }

  render() {
    const { image, title, price, description } = this.props.counter;
  
    return (
      <div className="product-card">
        <img src={image} alt={title} className="product-image" />
        
        <div className="product-info">
          <div className="product-title">{title}</div>
          <div className="product-price">P{price}</div>
          <div className="product-description">{description}</div>
          
          {/* Your Buttons Section */}
          <div className="d-flex justify-content-between align-items-center">
               {/* Add your existing counter buttons here */}
               <button 
                  className="btn btn-primary btn-sm" 
                  onClick={() => this.props.onAdd(this.props.counter)}
               >
                 ADD TO CART
               </button>
          </div>
        </div>
      </div>
    );
  }
}
