const jsonData = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];
function FilterableProductTable(props) {
  return (
    <div>
      <SearchBar />
      <ProductTable data={props.jsonData} />
    </div>

  );
}
function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Search..." />
      <p>
        <input type="checkbox" />
          Only show products in stock
        </p>

    </div>
  )
}
function ProductTable(props) {
  const rows = [];
  let lastCategory = null;
  props.data.map((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <div key={product.category}>
          <br />
          <div>
            <ProductCategoryRow category={product.category} />
          </div>
          <div>
            <label>Name</label>{" / "}
            <label>Price</label>
          </div>
        </div>
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });
  return (
    <div>
      <div>
        {rows}
      </div>
    </div>
  )
}
function ProductCategoryRow(props) {
  const { category } = props;
  return (
    <div>
      <label>{category}</label>
    </div>
  )
}

function ProductRow(props) {
  const { product } = props;
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>
    {product.name}
  </span>;
  return (
    <div>
      <label>{name}</label>{" / "}
      <label>{product.price}</label>
    </div>
  )
}
ReactDOM.render(
  <FilterableProductTable jsonData={jsonData}>Hello, world!</FilterableProductTable>,
  document.getElementById('root')
);

