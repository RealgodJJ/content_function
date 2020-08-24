import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
  static defaultProps = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  };

  // constructor () {
  //   this.state = {
  //     comment: []
  //   };
  // }

  // addComment(comment) {
  //   this.state.comments.push(comment);
  //   this.setState({
  //     comments: this.state.comments
  //   });
  // }

  handleDeleteComment(index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render() {
    // const comments = [
    //   { username: 'Jerry', content: 'Hello' },
    //   { username: 'Tomy', content: 'World' },
    //   { username: 'Jerry', content: 'Good' }
    // ];

    return (
      <div>
        {/* {comments.map((comment, i) => {
          return (
            <div key={i}>
              {comment.username}: {comment.content}
            </div>
          )
        })} */}
        {/* {comments.map((comment, i) =>
          <Comment comment={comment} key={i} />)} */}
        {this.props.comments.map((comment, i) =>
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
      </div>
    );
  }
}

export default CommentList;