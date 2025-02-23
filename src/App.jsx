import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="container mx-auto max-w-6xl p-6 flex flex-col items-center">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
