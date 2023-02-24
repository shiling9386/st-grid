import "./App.css";
import STGrid from "./components/ts-grid/STGrid";

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
      <STGrid<Person>
        data={data}
        columnDefs={[
          // render: (value) => <b>{value}</b>
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "age", label: "Age" },
          { key: "country", label: "Country" },
        ]}
      />
    </div>
  );
}

export default App;
