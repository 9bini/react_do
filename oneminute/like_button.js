'use strict';

const e = React.createElement;

// 컴포넌트 정의
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked comment number ' + this.props.commentID;
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}
// 컴포넌트 재사용 방법은 대개 페이지에서 React로 만들어진 부분들이 서로 격리 되어있을 때 유용합니다. 
// React 코드 내에서는 컴포넌트 합성을 사용하는 편이 더 쉽습니다.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    ReactDOM.render(
      e(LikeButton, { commentID: commentID }),
      domContainer
    );
  });