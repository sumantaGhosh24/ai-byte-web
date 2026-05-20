import {ModeToggle} from "./components/global/mode-toggle";
import {Button} from "./components/ui/button";

function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="h-[400px] w-[60%] flex items-center justify-center flex-col gap-10 rounded-md shadow-md dark:shadow-gray-100">
        <p className="text-3xl font-bold">AIByte Dashboard + Landing Page</p>
        <Button>Click Me</Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default App;
