import {Button} from "./components/ui/button";

function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-[400px] w-[60%] flex items-center justify-center flex-col gap-10 rounded-md shadow-md">
        <p className="text-3xl font-bold">AIByte Dashboard + Landing Page</p>
        <Button>Click Me</Button>
      </div>
    </div>
  );
}

export default App;
