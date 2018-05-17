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
              <NavbarBrand href="/">WP Dispensary</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                      <NavItem>
                          <NavLink href="https://www.wpdispensary.com/">Website</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink href="https://github.com/robertdevore/wpd-react">Github</NavLink>
                      </NavItem>
                  </Nav>
              </Collapse>
          </Navbar>
          <Jumbotron>
              <Container>
                  <Row>
                      <Col>
                          <h1>WPD REST API - TEST</h1>
                          <p>
                              <Button
                                  tag="a"
                                  color="success"
                                  size="large"
                                  href="http://www.wpdispensary.com"
                                  target="_blank"
                              >
                                  Go to WP Dispensary
                              </Button>
                          </p>
                      </Col>
                  </Row>
                  <Row>
                    {this.state.products.map((product) =>
                      <Col sm="4">
                      <Card>
                        <CardImg top width="100%" src={ product.image } alt="Card image cap" />
                        <CardBody>
                          <CardTitle>{ product.name }</CardTitle>
                          <CardSubtitle>Card subtitle</CardSubtitle>
                          <CardText><strong>1g:</strong> { product.gram }</CardText>
                          <Button
                            data-item-name={ product.name }
                            data-item-id={ product.id }
                            data-item-image={ product.image }
                            data-item-description={ product.description }
                            data-item-url= { product.link }
                            data-item-price={ product.gram }>
                            Buy Now
                          </Button>
                        </CardBody>
                      </Card>
                      </Col>
                    )}
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
