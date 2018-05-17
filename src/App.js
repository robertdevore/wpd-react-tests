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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      products: [],
      dataRoute: 'https://www.wpdispensary.com/demo/wp-json/wp/v2/flowers?per_page=100',
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
          <NavbarBrand href="/"><strong>WP Dispensary</strong> Flowers</NavbarBrand>
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
              {this.state.products.map((product) =>
                <Col sm="4">
                <Card className="wpd-react-card-class-name">
                  <a href={ product.link }><CardImg top width="100%" src={ product.image } alt="Card image cap" /></a>
                  <CardBody>
                    <CardTitle>{ product.name }</CardTitle>
                    <CardSubtitle>{ product.category }</CardSubtitle>
                    <CardText><strong>1g:</strong> ${ product.gram }</CardText>
                    <Button color="success" size="lg" block>
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
      category: product.flowers_category,
      description: product.description
    }
  }
}

export default App;
