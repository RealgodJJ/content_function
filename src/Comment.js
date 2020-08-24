import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  static propTypes = {
    //组件参数验证
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
    // PropTypes.array
    // PropTypes.bool
    // PropTypes.func
    // PropTypes.number
    // PropTypes.object
    // PropTypes.string
    // PropTypes.node
    // PropTypes.element
  };

  constructor () {
    super();
    this.state = { timeString: '' };
  }

  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    );
  }

  componentWillUnmount() {
    //在组件销毁时，清除所用的定时器
    clearInterval(this._timer);
  }

  _updateTimeString() {
    const comment = this.props.comment;
    //计算时间间隔
    const duration = (Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration / 60)} 分钟前`
        : `${Math.round(Math.max(duration, 1))}秒前`
    });
  }

  _getProcessedContent(content) {
    return content
      //防止恶意输入<HTML>标签进行攻击
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      //创建包裹模式
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  handleDeleteComment(event) {
    //通知CommentList删除评论
    if (this.props.onDeleteComment) {
      //设置待删除的评论编号
      this.props.onDeleteComment(this.props.index);
    }
  }

  render() {
    const { comment } = this.props;
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username}</span>：
        </div>
        {/* <p>{comment.content}</p> */}
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span className='comment-delete'
          onClick={this.handleDeleteComment.bind(this)}>
          删除
        </span>
      </div>
    );
  }
}

export default Comment;