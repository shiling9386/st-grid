import "./App.css";
import TSGrid from "./components/ts-grid/TSGrid";

interface Person {
  id: number;
  name: string;
  age: number;
  country: string;
}

const data: Person[] = [
  { id: 1, name: "John", age: 30, country: "USA" },
  { id: 2, name: "Jane", age: 25, country: "Canada" },
  { id: 3, name: "Bob", age: 40, country: "USA" },
];

function App() {
  return (
    <div className="App">
      <h1>Title</h1>
      <TSGrid
        data={data}
        columns={[
          { key: "id", label: "ID", render: (value) => <b>{value}</b> },
          { key: "name", label: "Name" },
          { key: "age", label: "Age", type: "checkbox" },
          { key: "country", label: "Country" },
        ]}
        // onRowClick={handleRowClick}
      />
    </div>
  );
}

export default App;
