# 엘리먼트 렌더링

엘리먼트는 React 앱의 가장 작은 단위입니다.

엘리먼트는 화면에 표시할 내용을 기술합니다.

```javascript
const element = <h1>Hello, world</h1>;
```

브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object) 쉽게 생성할 수 있습니다. `React DOM`은 React 엘리먼트와 일치하도록 DOM을 업데이트합니다.
> 주의
>
> 더 널리 알려진 `컴포넌트`와 엘리먼트를 혼동할 수 있습니다.

## DOM에 엘리먼트 렌더링하기

HTML 파일 어딘가에 `<div>`가 있다고 가정해 봅시다.

```html
<div id="root"></div>
```

이 안에 들어가는 모든 엘리먼트를 React DOM 에서 관리하기 때문에 이것을 "루트(root)" DOM 노드라고 부릅니다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있습니다.
React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노트가 있을 수 있습니다.
> 어떤 태그를 루트 DOM으로 지정하는 느낌

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 `ReactDom.render()`로 전달하면됩니다.

## 렌더링 된 엘리먼트 업데이트 하기

React 엘러먼트는 불변객체입니다.  
엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없습니다.  
엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여줍니다.

지금까지 소개한 내용을 바탕으로 하면 UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `ReactDOM.render()`로 전달하는 것입니다.

```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

// setInterval 초마다 tick를 호출합니다.
setInterval(tick, 1000);
```

> 주의
>
> 실제로 대부분의 React앱은 ReactDOM.render()를 한 번만 호출합니다.  
>다음 장에서는 이와 같은 코드가 `유상태 컴포넌트`에 어떻게 캡슐화되는지 설명합니다.

## 변경된 부분만 업데이트하기

ReactDOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우만 DOM을 업데이트 합니다.
> 엘리먼트와에 변경된 부분만 real DOM에 반영한다는건가?

매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만 React DOM은 내용이 변경된 텍스트 노드(시간)만 업데이트했습니다.

경험에 비추어 볼 때 특정 시점에 UI가 어떻게 보일지 고민하는 이런 접근법은 시간의 변화에 따라 UI가 어떻게 변화할지 고민하는 것보다 더 많은 수의 버그를 없앨 수 있습니다.
