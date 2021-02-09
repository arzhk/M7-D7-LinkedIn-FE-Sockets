import React from "react";
import Moment from "react-moment";
import env from "react-dotenv";
import { Card, Image, Row, Col, Button, Dropdown, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobeAmericas,
  faGrinWink,
  faHandHoldingHeart,
  faHeart,
  faLightbulb,
  faSignLanguage,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./PostComments";

class Posts extends React.Component {
  state = {
    /************STATE FOR POSTS************* */
    comments: false,
    deletePosts: false,
    reactionsModal: false,
    /******STATES FOR REACTION*******/
    reaction: "1",
    AllComments: this.props.data.comments,
    AllReactions: [],
    CommentsPost: [],
    icon: faThumbsUp,
    color: "rgba(0,0,0,0.6)",
    word: "Like",
    numberLikes: 0,
    numberComments: 0,
    liked: false,
    isModalLoading: false,
  };

  toggleComments = () => this.setState({ comments: !this.state.comments });
  toggleDeletePosts = () => this.setState({ deletePost: !this.state.deletePost });
  toggleReactions = () => this.setState({ reactionsModal: !this.state.reactionsModal });

  /*****************REACTIONS************************/

  /******FUNCTIONS FOR REACTION*******/

  componentDidMount = () => {
    /*  this.getReactions(); */
    this.getComments();
    if (this.props.data.likes.filter((like) => like.userId === this.props.loggedInUserID).length !== 0) {
      this.setState({ liked: true });
    } else {
      this.setState({ liked: false });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    /*     this.getComments(); */
    if (prevProps.data.likes !== this.props.data.likes) {
      if (this.props.data.likes.filter((like) => like.userId === this.props.loggedInUserID).length !== 0) {
        this.setState({ liked: true });
      } else {
        this.setState({ liked: false });
      }
    }
  };

  isLiked = () => {
    if (this.state.liked) {
      this.deleteLikeHandler();
    } else {
      this.sendLikeHandler();
    }

    /*     if (this.state.liked[0]) {
      this.deletePost(this.state.liked[1]);
      this.setState({ liked: [!this.state.liked[0], ""], color: "rgba(0,0,0,0.6)" });
    } else {
      this.handleChange(1);
    } */
  };

  sendLikeHandler = async () => {
    try {
      const like = {
        username: this.props.loggedInUsername,
        userId: this.props.loggedInUserID,
        reaction: 1,
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${this.props.data._id}/like`, {
        method: "POST",
        body: JSON.stringify(like),
        headers: {
          "Content-Type": "application/json",
        },
      });
      this.props.getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  deleteLikeHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${this.props.data._id}/like/${this.props.loggedInUsername}`,
        {
          method: "DELETE",
        }
      );
      this.props.getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  /* getReactions = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${this.props.data._id}`);
      if (response.ok) {
        let currentState = { ...this.states };
        currentState.AllComments = await response.json();
        currentState.AllReactions = currentState.AllComments.filter((comment) => comment.comment === "/reactions");
        currentState.CommentsPost = currentState.AllComments.filter((comment) => comment.comment !== "/reactions");
        currentState.numberComments = currentState.AllComments.length - currentState.AllReactions.length;
        currentState.numberLikes = currentState.AllReactions.length;
        let userReaction = currentState.AllReactions.filter((comment) => comment.author === "arzhk");
        currentState.liked = userReaction.length > 0 && [true, userReaction[0]._id];
        currentState.liked[0] && this.likeButton(userReaction[0].rate);
        this.setState(currentState);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  getComments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${this.props.data._id}/comments`);
      const commentsData = await response.json();

      this.setState({ AllComments: commentsData.reverse() });
    } catch (error) {
      console.log(error);
    }
  };

  /*   postReactions = async (rate) => {
    let commentReaction = {
      elementId: this.props.data._id,
      rate: rate,
      comment: "/reactions",
    };
    try {
      let response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(commentReaction),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        this.getReactions();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  /*  deletePost = async (id) => {
    try {
      let response = await fetch(this.url + id, {
        method: "DELETE",
      });
      if (response.ok) {
        this.getReactions();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  /* putReactions = async (rate, id) => {
    let commentReaction = {
      elementId: this._id,
      rate: rate,
      comment: "/reactions",
    };
    try {
      let response = await fetch(this.url + id, {
        method: "PUT",
        body: JSON.stringify(commentReaction),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        this.getReactions();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  /*  handleChange = (rate) => {
    this.setState({ reaction: rate });
    this.likeButton(rate);
     this.state.liked[0] ? this.putReactions(rate, this.state.liked[1]) : this.postReactions(rate);
  }; */

  likeButton = (rate) => {
    switch (rate) {
      case 1:
        this.setState({ icon: faThumbsUp });
        this.setState({ color: "#5894f5" });
        this.setState({ word: "Like" });
        break;
      case 2:
        this.setState({ icon: faSignLanguage });
        this.setState({ color: "#40ba32" });
        this.setState({ word: "Celebrate" });
        break;
      case 3:
        this.setState({ icon: faHandHoldingHeart });
        this.setState({ color: "#8f4f9c" });
        this.setState({ word: "Support" });
        break;
      case 4:
        this.setState({ icon: faHeart });
        this.setState({ color: "#b81d1d" });
        this.setState({ word: "Love" });
        break;
      case 5:
        this.setState({ icon: faLightbulb });
        this.setState({ color: "#dbcd00" });
        this.setState({ word: "Insightful" });
        break;

      default:
        this.setState({ icon: faThumbsUp });
        this.setState({ color: "gray" });
        this.setState({ word: "Like" });
        break;
    }
  };
  render() {
    const { data, loggedInUserID } = this.props;
    let { color, icon, word } = this.state;
    return (
      <Card className="mb-4 posts swing-in-top-fwd">
        <Row className="justify-content-start m-3">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="rounded-pill"
              style={{ fontSize: "1.5rem", color: "rgba(0,0,0,0.5)" }}
            >
              <i className="fas fa-ellipsis-h"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <i className="fas fa-bookmark mr-4" style={{ height: 16, width: 16 }}></i>Save
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                <i className="fas fa-sliders-h mr-4" style={{ height: 16, width: 16 }}></i>Improve Feed
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                <i className="fas fa-eye-slash mr-4" style={{ height: 16, width: 16 }}></i>Hide this post
              </Dropdown.Item>
              {data.user._id === loggedInUserID && (
                <>
                  <Dropdown.Item onClick={() => this.props.editPost(data._id, data.text)}>
                    <i className="fas fa-edit mr-4" style={{ height: 16, width: 16 }}></i>Edit this post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={this.toggleDeletePosts}>
                    <i className="fas fa-trash-alt mr-4 text-danger" style={{ height: 16, width: 16 }}></i>Delete this
                    post
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Image src={data.user.image} roundedCircle style={{ height: "50px", width: "50px" }} fluid />

          <Col className="d-flex flex-column">
            <Row>
              <Link to={"/profile/"} className="text-dark">
                <h6 className="d-inline-block ml-3 mr-2 m-0 p-0 post-name-clickable">{`${data.user.name} ${data.user.surname}`}</h6>
              </Link>
              <small className="text-muted m-0 p-0"> - 1st</small>
            </Row>
            <small className="text-muted  m-0 p-0">{data.user.title}</small>
            <small className="text-muted  m-0 p-0">
              {data.updatedAt === data.createdAt ? (
                <Moment fromNow>{data.createdAt}</Moment>
              ) : (
                <span>
                  <Moment fromNow>{data.updatedAt}</Moment> - Edited
                </span>
              )}
              . - <FontAwesomeIcon icon={faGlobeAmericas} className="ml-1" />
            </small>
          </Col>
        </Row>

        <Card.Body className="d-flex justify-content-between text-wrap pb-0">
          <Col>
            <Row>
              <p className=" text-wrap text-break ">{data.text}</p>
            </Row>
            <Row>
              {data.image !== undefined &&
                data.image !== null &&
                !data.image.startsWith("file") &&
                !data.image.startsWith("blob") && <Image src={data.image} fluid />}
            </Row>
          </Col>
        </Card.Body>
        <p className="border-bottom mb-2 mx-3 pb-2 mt-3">
          {this.props.data.likes.length > 0 && (
            <small style={{ color: "rgba(0,0,0,0.6)" }}>
              <FontAwesomeIcon icon={faThumbsUp} style={{ color: "5894f5" }} /> {this.props.data.likes.length}
            </small>
          )}
          {this.props.data.comments.length > 0 && (
            <small style={{ color: "rgba(0,0,0,0.6)" }}> - {this.props.data.comments.length} Comments</small>
          )}{" "}
        </p>

        <Row className="mx-2 reactions d-flex justify-content-around ">
          <Button variant="light" className="likeBtn" onClick={() => this.isLiked()} style={{ color: color }}>
            {this.state.liked ? (
              <FontAwesomeIcon icon={icon} style={{ color: color, fontSize: "23px" }} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                width="24"
                height="24"
                focusable="false"
                className="mr-1"
              >
                <path d="M19.46 11l-3.91-3.91a7 7 0 01-1.69-2.74l-.49-1.47A2.76 2.76 0 0010.76 1 2.75 2.75 0 008 3.74v1.12a9.19 9.19 0 00.46 2.85L8.89 9H4.12A2.12 2.12 0 002 11.12a2.16 2.16 0 00.92 1.76A2.11 2.11 0 002 14.62a2.14 2.14 0 001.28 2 2 2 0 00-.28 1 2.12 2.12 0 002 2.12v.14A2.12 2.12 0 007.12 22h7.49a8.08 8.08 0 003.58-.84l.31-.16H21V11zM19 19h-1l-.73.37a6.14 6.14 0 01-2.69.63H7.72a1 1 0 01-1-.72l-.25-.87-.85-.41A1 1 0 015 17l.17-1-.76-.74A1 1 0 014.27 14l.66-1.09-.73-1.1a.49.49 0 01.08-.7.48.48 0 01.34-.11h7.05l-1.31-3.92A7 7 0 0110 4.86V3.75a.77.77 0 01.75-.75.75.75 0 01.71.51L12 5a9 9 0 002.13 3.5l4.5 4.5H19z"></path>
              </svg>
            )}
            <span className="d-sm-none d-lg-inline-block"> {word}</span>{" "}
          </Button>
          <Button variant="light" onClick={this.toggleComments}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="rgba(0,0,0,0.6)"
              width="24"
              height="24"
              focusable="false"
              className="mr-1"
            >
              <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L12 22v-4H8A7 7 0 018 4h8a7 7 0 017 7zm-2 0a5 5 0 00-5-5H8a5 5 0 000 10h6v2.28L19 15a4.79 4.79 0 002-4z"></path>
            </svg>
            <span className="d-sm-none d-lg-inline-block">Comment</span>{" "}
          </Button>
          <Button variant="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="rgba(0,0,0,0.6)"
              width="24"
              height="24"
              focusable="false"
              className="mr-1"
            >
              <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
            </svg>
            <span className="d-sm-none d-lg-inline-block">Share</span>{" "}
          </Button>
          <Button variant="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="rgba(0,0,0,0.6)"
              width="24"
              height="24"
              focusable="false"
              className="mr-1"
            >
              <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
            </svg>
            <span className="d-sm-none d-lg-inline-block">Send</span>
          </Button>
          <Row className="like-choice">
            <Button variant="link">
              <FontAwesomeIcon onClick={() => this.handleChange(1)} icon={faThumbsUp} />
            </Button>
            <Button variant="link">
              <FontAwesomeIcon onClick={() => this.handleChange(2)} icon={faSignLanguage} />
            </Button>
            <Button variant="link">
              <FontAwesomeIcon onClick={() => this.handleChange(3)} icon={faHandHoldingHeart} />
            </Button>
            <Button variant="link">
              <FontAwesomeIcon onClick={() => this.handleChange(4)} icon={faHeart} />
            </Button>
            <Button variant="link">
              <FontAwesomeIcon onClick={() => this.handleChange(5)} icon={faLightbulb} />
            </Button>
            <Button variant="link">
              <FontAwesomeIcon icon={faGrinWink} />
            </Button>
          </Row>
        </Row>

        {this.state.comments && (
          <Comments
            loggedInUsername={this.props.loggedInUsername}
            loggedInUserImage={this.props.loggedInUserImage}
            comments={this.state.AllComments}
            postId={this.props.data._id}
            profilePicture={data.user.image}
            getComments={this.getComments}
            getPosts={this.props.getPosts}
          />
        )}

        {this.state.deletePost && (
          <Modal show={true} onHide={this.toggleDeletePosts}>
            <Modal.Body style={{ padding: "50px 50px 0px 50px" }}>
              <h4>Are you sure you want to delete this Post?</h4>
            </Modal.Body>
            <Modal.Footer style={{ border: "none", padding: 50 }}>
              {this.state.isModalLoading ? (
                <div className="w-100 mx-auto py-2 d-flex align-items-center justify-content-center">
                  <small
                    className="font-weight-bold mr-2 mb-0"
                    style={{ backgroundColor: "#f2f2f2", padding: "14px 20px", borderRadius: "0.5rem" }}
                  >
                    Deleting Post...
                    <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                    <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                    <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                  </small>
                </div>
              ) : (
                <>
                  <Button
                    variant="danger"
                    className="px-5 rounded-pill"
                    onClick={() => {
                      this.setState({ isModalLoading: true });
                      setTimeout(() => {
                        this.props.deletePost(data._id);
                        this.setState({ isModalLoading: false });
                        this.toggleDeletePosts();
                      }, 2000);
                    }}
                  >
                    Yes
                  </Button>
                  <Button variant="outline-secondary" className="px-5 rounded-pill" onClick={this.toggleDeletePosts}>
                    No
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal>
        )}
        {/*   {reactionsModal && (
          <Modal show={true} id="reactionsModal" onHide={this.toggleReactions}>
            <Modal.Header closeButton onClick={this.toggleReactions} style={{ border: "none" }}>
              <Modal.Title>Reactions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Col>
                <Row className="justify-content-around pl-2">
                  <p>Users Name</p>
                  <p>Reaction</p>
                </Row>
                {AllReactions.map((reaction) => (
                  <Row className="justify-content-around m-2 ml-0 pb-2 border-bottom">
                    <div>{reaction.author}</div>{" "}
                    <FontAwesomeIcon
                      size="4x"
                      icon={(() => {
                        let result;

                        switch (reaction.rate) {
                          case 2:
                            result = faSignLanguage;
                            break;
                          case 3:
                            result = faHandHoldingHeart;
                            break;
                          case 4:
                            result = faHeart;
                            break;
                          case 5:
                            result = faLightbulb;
                            break;
                          default:
                            result = faSignLanguage;
                            break;
                        }
                        console.log(reaction.rate);
                        return result;
                      })()}
                    />
                  </Row>
                ))}
              </Col>
            </Modal.Body>
          </Modal>
        )} */}
        {this.state.AllComments.length === 0 && (
          <Card.Footer className="py-2 mt-2 border-0" style={{ color: "rgba(0,0,0,0.4)", border: "none" }}>
            Be the first to comment on this post.
          </Card.Footer>
        )}
      </Card>
    );
  }
}

export default Posts;
