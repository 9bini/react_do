'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

// querySelector 함수를 사용하니 'like_button_container' 클래스 값을 가진 첫번재 값만 가져온다.
// querySelector => querySelectorAll
// 교체 후 ReactDOM.render() 에서 Target container is not a DOM element. 에러 발생
// 에러 내용을 보면 알 수 있듯이 domContainer가 DOM element아니라서 오류가 발생
// querySelectorAll 교체하면서 DOM element가 아닌 배열을 그대로 넘겼다.
// forEach로 domContainer를 하나씩 넘기면 될듯하다.
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    ReactDOM.render(e(LikeButton), domContainer);
  });


