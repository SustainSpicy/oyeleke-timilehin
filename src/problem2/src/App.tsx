import Converter from "./components/converter";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="main wrapper p-custom justify-self-center flex flex-wrap sm:justify-center w-full pt-12 gap-2 ">
        <div className="graph flex-1"></div>
        <Converter />
      </div>
    </>
  );
}

export default App;
