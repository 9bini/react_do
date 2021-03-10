const element = <h1>Hello, world!</h1>;

const name = 'Josh Perez';
const element2 = <h1>Hello, {name}</h1>;

function formatName(user){
  return user.firstName + ' ' + user.lastName
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element3 = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
)

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

const element4 = <div tabIndex="0"></div>;
const element5 = <img src={user.avatarUrl}></img>;

const element6 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);

const element7 = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element8 = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

ReactDOM.render(
    element8,
    document.getElementById('root')
  );
