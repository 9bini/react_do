const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);


const listItems = numbers.map((number, index) =>
  <li key={index}>{number}</li>
);
console.log(listItems);

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => {
    <li key={number.toString()}>
      {number}
    </li>
  });
  return <ul>{listItems}</ul>;
}

function Blog(props) {
  const sidebar = (
    <ul>
      {
        props.posts.map(
          (post) => <li key={post.id}>
            {post.title}
          </li>
        )
      }
    </ul>
  );
  const content = props.posts.map(
    (post) => <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts = [
  { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
  { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];

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


ReactDOM.render(
  // <ul>{listItems}</ul>
  // <NumberList numbers={numbers} />
  <Blog posts={posts} />
  ,
  document.getElementById('root')
);
