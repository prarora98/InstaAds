import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import PostItem from "../post/PostItem";
import Carousel from "../carousel/Carousel";
import SharePost from "../post/SharePost";

import "./Home.scss";

export default class Home extends Component {
  state = {
    posts: null,
    ads: null,
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
      let res = await axios.get("/api/timeline");
      const posts = [];
      res.data.posts.forEach((post, i) => {
        if (i % 3 === 0 && res.data.ads[i / 3]) posts.push(res.data.ads[i / 3]);
        posts.push(post);
      });
      this.setState({ posts });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="home-main-container">
        <Route path="/share/:postId" component={SharePost} />
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
