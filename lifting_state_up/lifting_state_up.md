# State 끌어올리기

종종 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있습니다.
이럴 때는 가정 가까운 공통조상으로 state를 끌어올리는 것이 좋습니다.
이런 일을 어떻게 할 수 있을지 지금부터 살펴봅시다.

이번 섹션에서는 주어진 온도에서 물의 끓는 여부를 추정하는 온도 계산기를 만들어볼 것입니다.

먼저 `BoilingVerdict`라는 이름의 컴포넌트부터 만들어봅시다.
이 컴포넌트는 섭씨온도를 의미하는 `celsius` prop를 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력합니다.

```jsx
function BoilingVerdict(props){
    if(props.celsius >= 100){
        return <p>The wather would boil.</p>;
    }
    return <p>The wather would not boil.</p>;
}
```

그 다음으로 `Calculator`라는 컴포넌트를 만들어보겠습니다.
이 컴포넌트는 온도를 입력할 수 있는 `<input>`을 렌더링하고 그 값을 `this.state.temperature`에 저장합니다.

또한 현재 입력값에 대한 `BoilingVerdict` 컴포넌트를 렌더링합니다.

```jsx
class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};     
    }

    handleChange(e){
        this.setState({temperature: e.target.value});
    }

    render(){
        const temperature = this.state.temperature;
        return (
            <fieldset>
            <legend>Enter temperature in Celsius:</legend>
            <input 
                value={temperature}
                onChange={this.handleChange}
            />
            <BoilingVerdict
                celsius={parseFloat(temperature)}
            />
            </fieldset>
        )
    }
}
```

## 두 번째 Input 추가하기

새 요구사항으로써 섭씨 입력 필드뿜만 아니라 화씨 입력 필드를 추가하고 두 필드 간에 동기화 상태를 유지하도록 해보겠습니다.

```jsx
const scaleNames={
    c:'Celsius',
    f:'Fahreheit'
};

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};     
    }

    handleChange(e){
        this.setState({temperature: e.target.value});
    }

    render(){
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
             <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                 <input 
                 value={temperature}
                 onChange={this.handleChange} />
            </fieldset>
        )
    }
    
}
```

이제 `Calculator`가 분리된 두 개의 온도 입력 필드를 렌더링하도록 변경할 수 있습니다.

```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```
이제 두 대의 입력 필드를 갖게 되었습니다.
그러나 둘 중 하나에 온도를 입력하더라도 다른 하나는 갱신되지 않는 문제가 있습니다.
이것은 두 입력 필드간에 동기화 상태를 유지하고자 했던 원래 요구사항과는 맞지 않습니다.

또한 `Calculator`에서 `BoilingVerdict`도 역시 보여줄 수 없는 상황입니다.
현재 입력된 온도정보가 `TemperatureInput` 안에 숨겨져 있으므로 `Calculator` 는 그 값을 알 수 없기 때문입니다.
> 하위 값을 접근과 관련된 문제가 발생해서 하향식 개발을 권장하는 느낌이다.

## 변환 함수 작성하기

먼저, 섭씨를 화씨로,또는 그 반대로 변환해주는 함수를 작성해보겠습니다.

```javascript
function toCelsius(fahrenheit) {
      return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

이 두 함수는 숫자를 변환합니다.
이제 `temperature` 문자열과 변환 함수를 인수로 취해서 문자열을 반환하는 또 다른 함수를 작성해 보겠습니다.
그리고 그것을 한 입력값에 기반해 나머지 값을 계산하는 용도로 사용할 것입니다.

이 함수는 올바르지 않는 `temperature` 값에 대해서 빈 문자열을 반환하고 값을 소수점 세 번째 자리로 반올림하여 출력합니다.
```javascript
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
```

## State 끌어올리기

현재 두 `TemperatureInput` 컴포넌트가 각각의 입력값을 각자의 state에 독립적으로 저장하고 있습니다.

그러나 우리는 두 입력값이 서로의 것과 동기화된 상태로 있길 원합니다.
섭씨온도 입력값을 변경할 경우 화씨온도 입력값 역시 변환된 온도를 반영할 수 있어야 하며, 그 반대의 경우에도 마찬가지여야 합니다.

React에서 state를 공유하는 일은 그 값을 필요로하는 컴포넌트 간의 가장 가까운 조상으로 state를 끌어 올림으로써 이뤄낼 수 있습니다.
이렇게 하는 방법을 "state 끌어올리기"라고 부릅니다.
이제 `TemperatureInput` 이 개별적으로 가지고 있던 지역 state를 지우는 대신 `Calculator`로 그 값을 옮겨놓을 것입니다.

`Calculator`가 공유될 state를 소우하고 있으면 이 컴포넌트는 두 입력 필드의 현재 온도에 대한 "진리의 원천"이 됩니다.
이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있습니다.
두 `TemperatureInput` 컴포넌트의 props가 같은 부모인 `Calculator`로부터 전달되기 때문에, 두 입력 필드는 할상 동기화된 상태를 유지할 수 있게 됩니다.

우선, `TemperatureInput` 컴포넌트에서 `this.state.temperature`를 `this.props.temperature`로 대체할 것입니다. 지금은 `this.props.temperature`가 이미 존재한다고 가정해봅시다. 나중에는 이 값을 `Calculator로부터` 건네야 할 것입니다.
> 부모 값을 props에 두었는데 const에 넣어 두는 것도 괜찮을려나??
props는 읽기 전용입니다.
`temperature`가 지역 state였을 때는 그 값을 변경하기 위해서 그저 `TemperatureInput`의 `this.setState()`를 호출하는 걸로 충분했습니다.
그러나 이제 `temperature`가 부모로 부터 props로 전달되기 때문에 `TemperatureInput`은 그 값을 제어할 능력이 없습니다.

리액트에서는 보톤 이 문제를 컴포넌트를 "제어" 가능하게 만드는 방식으로 해결합니다.
DOM `<input>`이 `value`와 `onChange` prop를 건네받는 것과 비슷한 방식으로,
사용자 정의된 `TemperatureInput` 역시 `temperature`와 `onTemperatureChange` props를 자신의 부모인 `Calculator`로부터 건네받을 수 있습니다.

이제 `TemperatureInput`에서 온도를 갱신하고 싶으면 `this.props.onTemperatureChange`를 호출하면 됩니다.

> 주의  
> 사용자 정의 컴포넌트에서 `temperature`와 `onTemperatureChange` props의 이름이 특별한 의미를 갖진 않습니다.  
> 일관된 컨벤션으로 value와 onChange을 사용할 수도 있으며, 여러분이 원하는 그 어떤 이름이든지 사용할 수 있습니다.

`onTemperatureChange` prop는 부모 컴포넌트인 `Calculator`로 부터 `temperature` prop와 함께 제공될 것입니다.
이를 이용해 자신의 지역 `state`를 수정해서 변경사항을 처리하므로,
변경되 새 값을 전달받은 두 입력 필드는 모두 리렌더링될 것 입니다.

`TemperatureInput` 컴포넌트의 지역 state를 제거했으며 `this.state.temperature` 대신에 `this.props.temperature`를 읽어오도록 변경했습니다.
state를 변경하고 싶을 경우 `this.setState()` 대신에 `Calculator`로부터 건네받은 `this.props.onTemperatureChange()`를 호출하도록 만들었습니다.

`Calculator` 컴포넌트에서 `temperature와` `scale`의 현재 입력값을 이 컴포넌트의 지역 state에 저장합니다.
이것은 우리가 입력 필드들로부터 “끌어올린” state이며 그들에 대한 “진리의 원천(source of truth)“으로 작용할 것입니다.
또 한 두 입력 필드를 렌덩링하기 위해서 알아야하는 모든데이터를최소한으로 표현한 것이기도 합니다.

두 입력 필드에 모두값을 저장하는 일도 가능해지만
결국은 불필요한 작없이었던 것입니다.
가장 최근에 변경되 입력값과 그 값이 나타내는 단위를 저장하는 것만으로도 충분합니다.
그러고 나면 현재의 `temperature`와 `scale`에 기반해 다른 입력 필드의 값을 추론할 수 있습니다.

두 입력 필드의 값이 동일한 state로부터 계산되기 때문에 이 둘은 항상 동기화된 상태를 유지하게 됩니다.

