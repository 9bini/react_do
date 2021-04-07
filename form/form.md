# 폼

HTML 폼 엘리먼트는 폼엘리먼트 자체가 내부 상태를 가지기 때문에
리액트의 다른 돔 엘리먼트와 조금 다르게 동작합니다.
예를 들어, 순수한 HTML에서 이 폼은 name을 입력받습니다.

```html
<form>
    <label>
        name:
        <input type="text" name="name"/>
    </label>
    <input type="submit" value="Submit"/>
</form>                                                             
```

이 폼은 사용자가 폼을 제출하면 새로운 페이지로 이동하는 기본 HTML 폼 동작을 수행합니다.
리액트에서 동일한 동작을 원한다면 그대로 사용하면 됩니다.
그러나 대부분의 경우, JS 함수로 폼을 제출을 처리하고 사용자가 폼에 입력한 데이터에 접근하도록 하는 것이 편리합니다.
> json으로 제출하는 걸 말하는 거겠지?
이를 위한 표준 방식은 "제어 컴포넌트(contorller component)"라고 불리는 기술을 이용합니다.
---

## 제어 컴포넌트(controller component)

HTML에서 `<input>`, `<textarea>`, `<select>`와 같이 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트 합니다.
리액트에서는 변경할 수 있는 state 속성을 유지되면 setState()에 의해 업데이트됩니다.

우리는 리액트 state를 **신뢰 가능한 단일 출력 (single source of truth)**로 만들어 두 요소를 결합 할 수 있습니다.
그러면 폼을 렌더링하는 리액트 컴포넌트는 폼에 발생하는 사용자 입력값을 제어합니다.
이러한 방식으로 리액트에 의해 값이 제어된느 입력 폼 엘리먼트를 **제어 컴포넌트**라고 합니다.

`value` 어트리뷰트는 폼 엘리먼트에 설정되므로 표시되는 값은 항상 `this.state.value`가 되고
리액트 state는 신뢰 가능한 단일 출처(single source of truth)가 됩니다.
리액트 state를 업데이트하기 위해 모든 키 입력에서 `handleChange`가 동작하기 때문에 사용자가 입력할 때 보여지는 값이 업데이트됩니다.

제어 컴포넌트로 사용하면, input의 값은 항상 리액트 state에 의해결정됩니다.
코드를 조금 더 작성해야 한다는 의미이지만, 다른 UI 엘리먼트에 Input의 값을 전달하거나 다른 이벤트 핸들러에서 값을 재 설정할 수 있습니다.
---
## textarea 태그

HTML에서 `<textarea>`엘리먼트는 텍스트를 자식으로 정의합니다.

```javascript
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

리액트에서 `<textarea>`는 `value` 어트리뷰트를 대신 사용합니다.
이렇게하면 `<textarea>`를 사용하는 폼은 한 줄 입력을 사용하는 폼과 비슷하게 작성할 수 있습니다.

```javascript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

`this.state.value`를 생성자에서 초기화하므로 textara는 일부 텍스트를가진채 시작되는 점을 주의해주세요.

## select 태그

HTML에서 `<select>`는 드롭 다운 목록을 만듭니다.
예를 들어, 이 HTML은 과일 드롭 다운 목록을 만듭니다.

```javascript
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

`select` 옵션이 있으므로 Cocount 옵션이 초기값이 되는 점을 주의해 주세요.
리액트에서는 `selected` 어트리뷰트를 사용하는 대신
최상단 `select` 태그에 `value` 어트리 뷰트를 사용합니다.
한 곳에서 업데이트만 하면되기 제어 컴포넌트에서 사용하기 더 편합니다.

```javascript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'coconut' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <from onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
      </from>
    )
  }
}
```

전반적으로 `<input type="text">, <textarea> 및 <select>` 모두 매우 비슷하게 동작합니다.
모든 제어 컴포넌트를 구현하는데 `value` 어트리뷰트를 허용합니다.

> # 주의

> `select` 태그에 multiple 옵션알 허용한다면 `value` 어트리 뷰트에 배열을 전달할 수 있습니다.  

```javascript
 <select multiple={true} value={['B', 'C']}>
```

## file input 태그

HTML에서 `<inpit type="file">`는 사용자가 하나 이상의 파일을 자신의 장치 저장소에서 서버로 업로드하거나 *file API*를 통해 JS로 조작할 수 있습니다.

```javascript
<input type="file" />
```

값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트입니다.
`문서 뒷부분`에서다른 비제어 컴포넌트와 함께설명하고 있습니다.

---

## 다중 입력 제어하기

여러 `input`엘리먼트를 제어해야할 때, 각 엘리먼트에 `name` 어트리뷰트를 추가하고 `event.target.name` 값을 통해 핸들러가 어던 작업을 할 지 선탤할 수 있게 해줍니다.
```javascript
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

주어진 input태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 computed property name 구문을 사용하고 있습니다.

```es6
this.setState({
  [name]: value
});
```

es5

```javascript
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

또한, setState()는 자동적으로 현재 state에 일부 state를 병합하기 때문에 바뀐 부분에 대해서만 호출하면 됩니다.

---

제어 컴포넌트에 value prop을 지정하면의도하지 않는 한 사용자가 변경할 수 없습니다.
`value`를 설정했는데 여전히 수정할 수 있다면 실수로 value를 undefined나 null로 설정했을 수 있습니다.

아래 코드가 이것을 보여줍니다. (첫 번째 입력은 잠겨있지만 잠시 후 입력이 가능해집니다.)
```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

## 제어 컴포넌트의 대한

데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고 리액트 컴포넌트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어 컴포넌트를 사용하는 게 지루할 수 있습니다.
특히 기존의 코드베이스를 리액트로 변경하고자 할 때 짜증날 수 있습니다.
이러한 경우에 입력 폼을 구현하기 위한 대체 기술인 비제어 컴포넌트를 확인 할 수 있습니다.

---

## 완전한 해결책

유효성 검사, 방문한 필드 추적 및 품 제출처리와 같은 완벽한 해결을 원한다면 *Formik*이 대중적인 선택 중 하나입니다.
그러나 Formik은 제어 컴포넌트 및 state 관리에 기초하기 때문에 배우는 걸 쉽게 생각하면 안됩니다.