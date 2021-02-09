import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Form, Modal, Row, Spinner } from "react-bootstrap";
import env from "react-dotenv";
import ArticleModal from "./ArticleModal";
import EventsModal from "./EventsModal";
import PostLoader from "./loaders/PostLoader";
import PhotoModal from "./PhotoModal";
import Posts from "./Posts";
import StartPost from "./StartPost";

class FeedMiddle extends React.Component {
  state = {
    openPhotoFromPost: false,
    photoModal: false,
    videoModal: false,
    articleModal: false,
    startPostModal: false,
    eventsModal: false,
    editModal: false,
    currentPostId: "",
    currentPost: {
      text: " ",
      username: this.props.userData.username,
      user: this.props.userData._id,
    },
    loadingPosts: false,
    posts: [],
    inputImage: [],
    postImage: "",
    isModalLoading: false,
  };

  componentDidMount = () => {
    this.getPosts();
  };

  // --------------------GET THE POSTS FROM API
  getPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/`);
      let data = await response.json();
      data = await data.reverse();
      this.setState({ posts: data, loadingPosts: true });
    } catch (e) {
      console.log(e);
      this.setState({ loadingPosts: true });
    }
  };

  //-------------------POST TEXT DATA TO API
  postData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/`, {
        method: "POST",
        body: JSON.stringify(this.state.currentPost),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      this.state.currentPost.text === " "
        ? this.setState({ currentPostId: data._id, postImage: { post: "" }, inputImage: [] })
        : this.setState({ currentPost: { text: " ", username: this.props.userData.username }, currentPostId: "" });
      this.state.currentPost.text === " " && this.state.startPostModal && this.setState({ openPhotoFromPost: true });
    } catch (e) {
      console.log(e);
    } finally {
      this.getPosts();
    }
  };
  //----------------------------POST IMAGE TYPE

  imagePost = async (id, file) => {
    let formData = new FormData();
    formData.append("post", file);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        this.state.currentPost.text === " "
          ? this.setState({ openPhotoFromPost: true, currentPostId: data._id, postImage: { post: "" }, inputImage: [] })
          : this.setState({ currentPost: { text: " " }, postingCurrentId: "" });
        setTimeout(() => {
          this.getPosts();
        }, 1000);
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //-----------------------------EDIT EXSISTING POST
  putData = async (event) => {
    try {
      this.setState({ isModalLoading: true });
      event !== undefined && event.preventDefault();
      let { currentPost, currentPostId } = this.state;
      let editPost = {
        text: currentPost.text,
        username: this.props.userData.username,
        user: this.props.userData._id,
      };
      await fetch(`${process.env.REACT_APP_API_URL}/posts/${currentPostId}`, {
        method: "PUT",
        body: JSON.stringify(editPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      currentPost.text = " ";
      currentPostId = "";
      setTimeout(() => {
        this.setState({ isModalLoading: false });
        this.setState({ currentPost, currentPostId, editModal: false });
      }, 2000);
    } catch (e) {
      console.log(e);
    } finally {
      this.getPosts();
    }
  };
  //--------------------------------DELETE POST----------------
  deletePost = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.getPosts();
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //---------------------HANDEL CHANGE FOR EDITING POSTS
  handelChange = (e) => {
    let { currentPost } = this.state;
    currentPost.text = e.target.value;
    this.setState({ currentPost });
  };
  //----------------------HANDEL DATA FROM COMPONENETS AND CALL FUNCTIONS
  sendPosts = async (data, inputImage, item) => {
    this.state.photoModal && (await this.postData());
    this.toggleModal(item);
    let { currentPost } = this.state;
    if (this.state.openPhotoFromPost && item === "photo") {
      let postImage = data;
      this.setState({ inputImage });
      this.setState({ postImage });
    } else if (this.state.openPhotoFromPost && item === "startPost") {
      currentPost.text = data;
      this.setState({ currentPost });
      let { currentPostId, postImage } = this.state;
      this.putData();
      this.imagePost(currentPostId, postImage);
    } else if (!this.state.openPhotoFromPost && item === "photo") {
      let postImage = data;
      let { currentPostId } = this.state;
      this.imagePost(currentPostId, postImage);
    } else {
      currentPost.text = data;
      this.setState({ currentPost });
      this.postData();
    }
  };

  //-----------------HANDELE EDIT POST MODAL
  editPost = (id, post) => {
    this.toggleModal("edit");
    const { currentPost } = this.state;
    currentPost.text = post;
    this.setState({ currentPostId: id, currentPost });
  };
  //----------------HANDEL TOGGLE FOR ALL MODALS
  toggleModal = (item, from) => {
    const currentstate = { ...this.state };
    currentstate[item + "Modal"] = !currentstate[item + "Modal"];
    this.setState(currentstate);
  };
  render() {
    const {
      photoModal,
      videoModal,
      articleModal,
      inputImage,
      startPostModal,
      eventsModal,
      loadingPosts,
      posts,
      editModal,
      currentPost,
    } = this.state;
    const { name } = this.props;
    return (
      <div id="feedMiddle">
        <div className="brdr-bottom mb-3 pb-3">
          {/*----------------------------- ADD POST -------------------------------- */}

          <Card className="px-4 pt-3 pb-2" id="cardPost">
            <div>
              <Button
                variant="light"
                className="w-100 rounded-pill font-small text-left"
                onClick={() => this.toggleModal("startPost")}
              >
                <i className="far fa-edit grey-text" style={{ fontSize: "1.2rem" }}></i>
                <span className="ml-2 grey-text">Start a post</span>
              </Button>
            </div>
            <Row className="justify-content-around mt-2">
              <Button onClick={() => this.toggleModal("photo")} variant="light">
                <FontAwesomeIcon icon={faPhotoVideo} style={{ color: "rgb(112, 181, 249)" }} />{" "}
                <span className="ml-1">Photo</span>
              </Button>
              <Button onClick={() => this.toggleModal("video")} variant="light">
                <i className="fab fa-youtube" style={{ color: "rgb(231, 163, 62)" }}></i>
                <span className="ml-1">Video</span>
              </Button>
              <Button onClick={() => this.toggleModal("events")} variant="light">
                <i className="far fa-calendar" style={{ color: "rgb(160, 180, 183)" }}></i>{" "}
                <span className="ml-1">Event</span>
              </Button>
              <Button onClick={() => this.toggleModal("startPost")} variant="light">
                <i className="fas fa-indent" style={{ color: "rgb(127, 193, 94)" }}></i>
                <span className="ml-2">Write article</span>
              </Button>
            </Row>
          </Card>
        </div>

        {/*----------------------------- CHILD COMPONENETS -------------------------------- */}

        {photoModal && <PhotoModal title="photo" show={true} onHide={this.toggleModal} sendPosts={this.sendPosts} />}
        {videoModal && <PhotoModal title="video" show={true} onHide={this.toggleModal} />}
        {articleModal && <ArticleModal show={true} />}
        {eventsModal && <EventsModal title="events" show={true} onHide={this.toggleModal} />}
        {startPostModal && (
          <StartPost
            show={true}
            name={name}
            userID={this.props.userData._id}
            onHide={this.toggleModal}
            sendPosts={this.sendPosts}
            inputImage={inputImage != null && inputImage}
          />
        )}
        <div id="load-more" className="mb-3">
          <Button variant="outline-primary" className="rounded-pill" onClick={this.getPosts}>
            New posts available...
          </Button>
        </div>
        {loadingPosts
          ? posts.length > 0 &&
            posts.map(
              (post, key) =>
                key < 50 && (
                  <Posts
                    key={key}
                    data={post}
                    loggedInUserID={this.props.userData._id}
                    loggedInUsername={this.props.userData.username}
                    loggedInUserImage={this.props.userData.image}
                    deletePost={this.deletePost}
                    editPost={this.editPost}
                    getPosts={this.getPosts}
                  />
                )
            )
          : Array.from({ length: 2 }, (_, i) => i + 1).map((i) => (
              <Card key={i} className="d-flex justify-content-center mt-2 align-content-center">
                <PostLoader className="w-100 h-100 p-4" />
              </Card>
            ))}

        {/*----------------------------- EDIT MODAL -------------------------------- */}
        {editModal && (
          <div>
            <Modal show={editModal} id="editModal" onHide={() => this.toggleModal("edit")}>
              <Form onSubmit={this.putData}>
                <Modal.Header closeButton onClick={() => this.toggleModal("edit")} style={{ border: "none" }}>
                  <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-start">
                  <Form.Group className="w-100">
                    {this.state.isModalLoading ? (
                      <div className="w-100 mx-auto py-2 d-flex align-items-center justify-content-center">
                        <small
                          className="font-weight-bold mr-2 mb-0"
                          style={{ backgroundColor: "#f2f2f2", padding: "14px 20px", borderRadius: "0.5rem" }}
                        >
                          Updating Post...{" "}
                          <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                          <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                          <Spinner variant="primary" animation="grow" role="status" className="ml-2" size="sm" />
                        </small>
                      </div>
                    ) : (
                      <>
                        <Form.Label>Post text</Form.Label>
                        <Form.Control
                          as="textarea"
                          id="description"
                          rows={3}
                          value={currentPost.text}
                          onChange={this.handelChange}
                        />
                      </>
                    )}
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer style={{ border: "none" }}>
                  <Button variant="primary" className="px-5 rounded-pill" type="submit">
                    Save
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="px-5 rounded-pill"
                    onClick={() => this.toggleModal("edit")}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default FeedMiddle;
