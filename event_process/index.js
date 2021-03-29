class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);


class PublicClassFieldLoggingButton extends React.Component {
  // 이 문법은 `this`가 handelChlick 내에서 바인딩되도록 합니다.
  // 우의: 이 문법은 *실험적인* 문법입니다.
  handleClick = () => {
    console.log('this is: ', this);
  }

  render() {

    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    )
  }
}



class ArrowFunctionLoggingButton extends React.Component {
  // 이 문법은 `this`가 handelChlick 내에서 바인딩되도록 합니다.
  handleClick() {
    console.log('this is: ', this);
  }

  render() {

    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </ button>
    )
  }
}