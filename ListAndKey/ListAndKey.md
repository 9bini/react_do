# 리스트와 Key

먼저 JS에서 리스트를 어덯게 변화하는 살펴봅시다.

아래 `map()`함수를 이용하여 `numbers` 배열의 값을 두배로 만든 후 `map()`에서 반환하는 새 배열을 `doubled` 변수에 할당하고 로그를 확인하는 코드입니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

리액트에서 배열을 엘리먼트 리스트로 만드는 방식은 이와 거의동일합니다.

## 여러개의 컴포넌트 렌더링 하기

엘리먼트 모음을 만들고 중괄호 `{}`를이용하여 JSX에 포함 시킬수 있습니다.

아래의 JS map() 함수를 사용하여 `numbers` 배열을 반복 실행합니다.
각 항목에 대해 `<li>` 엘리먼트를 반환하고 엘리먼트 배열의 결과를 `listItems`에 저장합니다.

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number, index) => <li key={index}>{number}</li>);
```

`ListItems` 배열을 `<ul>` 엘리먼트 안에 포함하고 DOM에 렌더링합니다.

```javascript
ReactDOM.render(<ul>{listItems}</ul>, document.getElementById("root"));
```

## 기본 리스트 컴포넌트

일반적으로 컴포넌트 안에서 리스트를 렌더링합니다.

이전 예제를 `numbers` 배열을 받아서 순서 없는 엘리먼트 리스트를 출력하는 컴포넌트로 리팩토링 할 수 있습니다.

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

이 코드를 실행하면 리스트의 각 항목에 key를 넣아야 한다는 경고가 표시됩니다. "Key"는 앨리먼트 리스트를만들 때 포함해야 하는 특수한 문자열 어트리뷰트 입니다.
다음 섹션에서 key의 중요성데 대해서 더 설명하겠습니다.
이제 `numbers.map()` 안에서 리스트의 각 함목에 `key`를 할당하여 키 누락 문제를 해결합니다.

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => {
    <li key={number.toString()}>
      {number}
    </li>}
    );
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
```

## Key

key는 리액트가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다.
키는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야합니다.

키를 선택하는 가정 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것입니다.
대부분의 경우 데이터의 ID를 Key로 사용합니다.

렌더링 한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있습니다.

```javascript
const listItems = numbers.map((number, index) => {
  <li key={index}>{number}</li>;
});
```

항목 순서가 바꿜 수 있는경우 key에 인덱스를 사용하는 것을 권장하지 않스빈다.
이로 인해 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있습니다.
만약 리스트 항목에 명시적으로 키를 지정하지 않으면 리액트는 기본적인 인덱스를 키로 사용합니다.

## 키로 컴포넌트 추출하기

키는 주변 배열의 context에서만 의미가 있습니다.

### 잘못된 키 사용법

```javascript
function ListItem(props) {
  const value = props.value;
  return (
    // 틀렸습니다! 여기에는 key를 지정할 필요가 없습니다.
    <li key={value.toString()}>{value}</li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 틀렸습니다! 여기에 key를 지정해야 합니다.
    <ListItem value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

### 예시: 올바른 Key 사용법

```javascript
function ListItem(props) {
  const value = props.value;
  return <li>{value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

경험상 `map()` 함수 내부에 있는 엘리먼트에 키를 넣어 주는 게 좋습니다.

## 키는 형제 사이에서만 고유한 값이어야 한다.

키는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없습니다.
두 개의 다른 배열을 만들 때 동안한 키를 사용할 수 있습니다.

```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map(() => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." },
];

ReactDOM.render(
  // <ul>{listItems}</ul>
  // <NumberList numbers={numbers} />
  <Blog posts={posts} />,
  document.getElementById("root")
);
```

리액트에서키는 힌트를 제공하지만 컴포넌트로 전달하지 않습니다.
컴포넌트에서 키와 동일한 값이 필요하다면 다른 이름의 prop으로 명시적으로 전달합니다.


```javascript
const content = posts.map((post) =>
  <Post
    key={post.id} // props.key 안되는 거 명시
    id={post.id}
    title={post.title} />
);
```

## JSX에 map() 포함시키기

위 예제에서 별도의 `listItems` 변수를 선언하고 이를 JSX에 포함했습니다.

```javascript
function NumberList(props) {
  const numbers = props / numbers;
  const listItems = numbers.map((number) => (
    <ListItem key={number.toString()} value={number} />
  ))
  return (
    <ul>
      {listItems}
    </ul>
  )
}
```

JSX를 사용하면 중괄호 안에 모든 표현식을 포함 시킬 수 있으므로 map() 함수의 결과를 인라인으로 처리할 수 있습니다.

```javascript
function NumberListInline(props) {
  const numbers = props / numbers;

  return (
    <ul>
      {
        numbers.map((number) => (
          <ListItem key={number.toString()} value={number} />
        ))
      }
    </ul>
  )
}
```

이 방식을 사용하면 코드가 더깔끔해 지지만, 이방식은 남발하는 것은 좋지 않습니다.
JS와 마찬가지로 가독성을 위해 변수로 추출해야 할지 아니면 인라인으로 넣을지 개발자가 직접 판단해야합니다.
`map()`함수가 너무 중첩된다면 컴포넌트로 추출 하는 것이 좋습니다.