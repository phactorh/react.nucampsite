import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { CAMPSITES } from "../shared/campsites";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(+val);
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      isModalOpen: false,
      author: "",
      rating: "",
      comment: "",
      author: false,
      rating: false,
      comment: false
    };
   
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
    this.toggleModal();
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  render() {
    return (
      <React.Fragment>
      <Button outline onClick={this.toggleModal}>
      <i className="fa fa-sign-in fa-lg" /> Submit Comments
    </Button>
    <Modal isOpen={this.state.isModalOpen} toggle={this.togggleModal}>
    <ModalHeader toggle={this.togggleModal}>Submit Comments</ModalHeader>
    <ModalBody>
    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating" >
                  Rating
                </Label>
                  <div></div>
                  <Control.select className="form-control"
                    model=".rating"
                    id="rating"
                    name="rating">
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                    
                    
                 
                
              </div>
              <div className="form-group">
                <Label htmlFor="name" >
                  Your Name
                </Label>
                
                  <Control.text className="form-control"
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    component="div"
                    messages={{
                      required: "Required",
                      minLength: "Must be at least 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                
              </div>
              
              <div className="form-group">
                <Label htmlFor="text" >
                  Comment
                </Label>
                
                  <Control.textarea className="form-control"
                    model=".text"
                    id="text"
                    name="text"
                    rows="6"
                    className="form-control"
                  />
                
              </div>
              <div className="form-group">
               
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
              
              </div>
            </LocalForm>
    </ModalBody>
  </Modal>
  </React.Fragment>
    )
  }
}
function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        
        {comments.map((comments) => (
          <div key={comments.id}>
            {comments.text}
            <br />
            --{comments.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comments.date)))}
            <br />
            <br />
          </div>
              
        ))}
          
          <CommentForm />
          
      </div>
    
    );
  } else {
    return <div>
      <Button>Submit Comments</Button>
    </div>;
  }
 
}
function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
          
        </div>
        
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CampsiteInfo;
