import React, { useState, Fragment } from "react";
import axios from "axios";
import { setAlert } from "../../actions/Alert";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { logout } from "../../actions/Auth";

const Landing = (props) => {
  const [posts, setPosts] = useState([{}]);
  const [postToggle, setPostToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [comment, setComment] = useState(" ");
  const [postId, setPostId] = useState(" ");

  //send comment
  const sendComment = async (e) => {
    e.preventDefault();
    if (
      props.auth.token !== localStorage.getItem("token") ||
      !props.auth.isAuthenticated ||
      !localStorage.getItem("token")
    ) {
      props.setAlert("invalid auth, access denied", "danger");
      props.logout();
    }
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };
    const data = {
      body: comment,
    };
    try {
      const body = JSON.stringify(data);
      const url = "/post/comment/" + postId;
      let comment = await axios.post(url, body, config);
      console.log(comment);
      props.setAlert("commented successfully", "success");
      props.setAlert("refresh the page", "success");
    } catch (err) {
      props.setAlert("comment not received", "danger");
    }
  };

  //fetch posts
  const loadPosts = async () => {
    setPostToggle(true);
    try {
      let response = await axios.get("/post");
      setPosts(response.data);
      if (response.data.length === 0) {
        setFetched(false);
        return props.setAlert("no posts found (empty database)", "danger");
      }
      props.setAlert("posts fetched successfully", "success");
    } catch (err) {
      props.setAlert("server error", "danger");
    }
  };

  //load posts
  const print = posts.map((post, index) => {
    return (
      <div key={index} className="ui  segments">
        <div className="ui segment">
          <h2> Title:{post.title}</h2>
        </div>
        <div className="ui secondary segment">
          <h4>Post:</h4>
          {post.post}
        </div>
        <br />
        {toggleComments === true ? (
          <h3 className="ui header">Comments:(latest to oldest)</h3>
        ) : null}
        {toggleComments === true
          ? post.comments.map((comment, index) => {
              return (
                <div className="ui secondary segment" key={index}>
                  <p className="item">{comment.body}</p>
                </div>
              );
            })
          : null}
        {props.auth.isAuthenticated === true ? (
          <Fragment>
            <br />
            <button
              className="ui primary button"
              onClick={() => {
                setPostId(post._id);
                setModal(!modal);
              }}
            >
              Add comment
            </button>
            <Modal
              isOpen={modal}
              toggle={() => {
                setModal(!modal);
              }}
            >
              <ModalHeader
                toggle={() => {
                  setModal(!modal);
                }}
              >
                Add comment
              </ModalHeader>
              <ModalBody>
                <form className="ui form">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    className="field"
                    type="text"
                    name="comment"
                    placeholder="comment body"
                  ></textarea>
                </form>
              </ModalBody>
              <ModalFooter>
                <button
                  className="ui button"
                  onClick={(e) => {
                    sendComment(e);
                    setModal(!modal);
                  }}
                >
                  Submit
                </button>
                <button
                  className="ui secondary button"
                  onClick={() => {
                    setModal(!modal);
                  }}
                >
                  Cancel
                </button>
              </ModalFooter>
            </Modal>
          </Fragment>
        ) : null}
      </div>
    );
  });
  return (
    <Fragment>
      <div>
        <h1 className="ui header">Home</h1>
      </div>
      <br />
      <div>
        <button
          className="ui primary button"
          onClick={() => {
            loadPosts();
            setFetched(true);
          }}
        >
          Fetch posts
        </button>
        {fetched === true ? (
          <button
            className="ui button"
            onClick={() => {
              setPostToggle(!postToggle);
              props.setAlert("Toggle posts successful", "success");
            }}
          >
            Toggle posts
          </button>
        ) : null}
        {fetched === true && props.auth.isAuthenticated ? (
          <button
            onClick={() => {
              setToggleComments(!toggleComments);
              props.setAlert("Fetch comments successful", "success");
            }}
            className="ui secondary button"
          >
            Fetch/Toggle comments
          </button>
        ) : null}
      </div>
      <br />
      {postToggle === true ? <div>{print}</div> : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.regUser,
  };
};

export default connect(mapStateToProps, { setAlert, logout })(Landing);
