import React, { Component } from "react";
import axios from "axios";

import PostItem from "../post/PostItem";
import Carousel from "../carousel/Carousel";
import "./Home.scss";

export default class Home extends Component {
  state = {
    posts: null,
    isLoading: true
  };

  async componentDidMount() {
    this.fetchPosts();
  }

  /**
   * Fetches the recent posts
   * @param {string}
   */
  fetchPosts = async () => {
    try {
      let posts = await axios.get("/api/timeline");
      this.setState({ posts: posts.data.posts });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="home-main-container">
        <Carousel />
        {this.state.posts &&
          this.state.posts.map(post => {
            return (
              <PostItem
                key={post._id}
                user={this.props.user}
                fetchPosts={this.fetchPosts}
                data={post}
              />
            );
          })}
      </div>
    );
  }
}
