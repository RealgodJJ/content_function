import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {
  /*状态提升:把组件交给上级的父节点(CommentApp)保管.
  可以方便之后同级组件之间的共享,通过props将
  状态传递给子组件,以共享组件间数据*/
  constructor () {
    super();
    this.state = {
      comments: []
    };
  }

  componentWillMount() {
    this._loadComments();
  }

  _loadComments() {
    //加载之前发表的评论
    let comments = localStorage.getItem('comments');
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments });
    }
  }

  _saveComments(comments) {
    //存储评论
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert('请输入用户名!');
    if (!comment.content) return alert('请输入评论内容!');

    const comments = this.state.comments;
    // console.log(comment);
    comments.push(comment);  //插入新的评论数据
    this.setState({ comments: comments });
    this._saveComments(comments);
  }

  handleDeleteComment(index) {
    console.log(index);
    const comments = this.state.comments;
    comments.splice(index, 1);  //删除对应评论
    this.setState({ comments });  //更新评论列表
    this._saveComments(comments); //将评论列表更新到LocalStorage中
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput
          onSubmit={this.handleSubmitComment.bind(this)} />

        {/*向其中传入数组作为输入参数*/}
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)} />
      </div>
    );
  }
}

export default CommentApp;