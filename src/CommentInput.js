import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentInput extends Component {
  //验证上传的是否为函数形式
  static propTypes = {
    onSubmit: PropTypes.func
  };

  constructor () {
    super();
    this.state = {
      username: '',
      content: ''
    };
  }

  componentWillMount() {
    this._loadUsername();
  }

  componentDidMount() {
    this.textarea.focus();
  }

  _loadUsername() {
    //把用户名从LocalStorage中加载到输入框中
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }
  }

  //私有方法以下划线开头
  _saveUsername(username) {
    //把用户输入的用户名存储到LocalStorage中
    localStorage.setItem('username', username);
  }

  handleUsernameBlur(event) {
    this._saveUsername(event.target.value);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleCommentChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date()
      });
    }

    this.setState({ content: '' }); //清空发表的评论内容
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)} //绑定失焦和用户名存储
              onChange={this.handleUsernameChange.bind(this)} //绑定成为受控组件
            />
          </div>
        </div>

        <div className='comment-field'>
          <div className='comment-field-name'>评论内容：</div>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea) => this.textarea = textarea}
              value={this.state.content}
              onChange={this.handleCommentChange.bind(this)}  //绑定成为受控组件
            />
          </div>
        </div>

        <div className='comment-field-button'>
          <button onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    );
  }
}

export default CommentInput;