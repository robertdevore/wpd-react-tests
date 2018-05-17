import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      products: [],
      dataRoute: 'https://www.wpdispensary.com/demo/wp-json/wp/v2/flowers',
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
          <Navbar color="inverse" light expand="md">
              <NavbarBrand href="/">reactstrap</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                      <NavItem>
                          <NavLink href="/components/">Components</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                      </NavItem>
                  </Nav>
              </Collapse>
          </Navbar>
          <Jumbotron>
              <Container>
                  <Row>
                      <Col>
                          <h1>Welcome to React</h1>
                          <p>
                              <Button
                                  tag="a"
                                  color="success"
                                  size="large"
                                  href="http://reactstrap.github.io"
                                  target="_blank"
                              >
                                  View Reactstrap Docs
                              </Button>
                          </p>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                    {this.state.products.map((product) =>
                      <div className="product" key={`product-${product.id}}`}>

                        <a href={ product.link }><img src={ product.image } alt={ product.name } className="product-image"/></a>
                        <p><a href={ product.link }>{ product.name }</a></p>
                        <p><strong>1g:</strong> { product.gram } </p>
                        <p><strong>3.5g:</strong> { product.eighth } </p>

                        <button className="snipcart-add-item"
                          data-item-name={ product.name }
                          data-item-id={ product.id }
                          data-item-image={ product.image }
                          data-item-description={ product.description }
                          data-item-url= { `${this.state.dataRoute}/${product.id}`}
                          data-item-price={ product.price }>
                          Buy it for { product.price } $
                        </button>

                      </div>
                    )}
                    </Col>
                  </Row>

              </Container>
          </Jumbotron>
      </div>
    );
  }

  componentDidMount(){
    fetch(this.state.dataRoute)
      .then(res => res.json())
      .then(products => this.setState((prevState, props) => {
        return { products: products.map(this.mapProduct)};
      }));
  }

  mapProduct(product){
    return {
      id: product.id,
      gram: product._gram,
      eighth: product._eighth,
      link: product.link,
      image: product.featured_image_url,
      name: product.title.rendered,
      description: product.description
    }
  }
}

export default App;
