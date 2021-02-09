import React from "react";
import { Image, Form, Col, Button, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import env from "react-dotenv";

class Comments extends React.Component {
  state = {
    comments: [],
    loaded: false,
    addComment: "",
    isLoading: false,
  };

  handleChange = (e) => {
    let { addComment } = this.state;
    addComment = e.currentTarget.value;
    this.setState({ addComment });
  };

  postComments = async (e) => {
    try {
      e.preventDefault();
      this.setState({ isLoading: true });
      let commentReaction = {
        text: this.state.addComment,
        user: this.props.loggedInUsername,
      };
      let response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${this.props.postId}/comments`, {
        method: "POST",
        body: JSON.stringify(commentReaction),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.getPosts();
        this.props.getComments();
        this.setState({ addComment: "" });
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  deleteComment = async (id) => {
    try {
      this.setState({ isLoading: true });
      await fetch(`${process.env.REACT_APP_API_URL}/posts/${this.props.postId}/comments/${id}`, {
        method: "DELETE",
      });

      setTimeout(() => {
        this.setState({ isLoading: false });
        this.props.getPosts();
        this.props.getComments();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { comments } = this.props;
    const { addComment } = this.state;
    return (
      <div className="mt-2 pt-2">
        <Col>
          <div className="row">
            <Col sm={1} className="d-sm-none d-md-inline mr-2">
              <Image src={this.props.loggedInUserImage} style={{ width: "40px", height: "40px" }} roundedCircle />
            </Col>
            <Col sm={10} className="p-0">
              <Form onSubmit={this.postComments}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    className="rounded-pill w-100 ml-3 p-3"
                    id={addComment}
                    value={addComment}
                    onChange={this.handleChange}
                    placeholder="Add a comment..."
                  />
                </Form.Group>
              </Form>
            </Col>
          </div>
          <div>
            {this.state.isLoading ? (
              <div className="w-100 py-2 d-flex align-items-start justify-content-start">
                <small
                  className="font-weight-bold mr-2 mb-0"
                  style={{ backgroundColor: "#f2f2f2", padding: "14px 20px", borderRadius: "0.5rem" }}
                >
                  Loading... <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                  <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                  <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                </small>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div className="mb-3 swing-in-top-fwd">
                  <div key={index} className="comments w-100 d-flex">
                    <Col className="m-0 p-1 pl-3">
                      <div className="m-0 p-0 d-flex flex-wrap">
                        <small className="font-weight-bold mr-2">{comment.user}</small>
                        <small className="text-muted font-weight-lighter">
                          <Moment fromNow>{comment.createdAt}</Moment>{" "}
                        </small>
                      </div>
                      <p className="m-0 p-0">{comment.text}</p>
                    </Col>
                  </div>
                  <small>
                    <Button className="m-0 p-0 text-muted mr-1" variant="link" style={{ fontSize: 14 }}>
                      Like |
                    </Button>
                    <Button className="m-0 p-0 text-muted mr-1" variant="link" style={{ fontSize: 14 }}>
                      Reply
                    </Button>
                    {comment.user === this.props.loggedInUsername && (
                      <Button
                        className="m-0 p-0 text-muted"
                        variant="link"
                        onClick={() => this.deleteComment(comment._id)}
                        style={{ fontSize: 14 }}
                      >
                        | Delete
                      </Button>
                    )}
                  </small>
                </div>
              ))
            )}
          </div>
        </Col>
      </div>
    );
  }
}

export default Comments;
