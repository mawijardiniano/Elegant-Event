import { Button } from "@/components/ui/button";
import useToggle from "./hooks/useToggle";

function App() {
  const [isOpen, { toggle, setTrue, setFalse }] = useToggle();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={setTrue} className="bg-red-500 text-white">
        Click me
      </Button>
      
      {isOpen && <p>hahaha</p>}
      <Button onClick={setFalse} className="bg-red-500 text-white">Close me</Button>

    </div>
  );
}

export default App;
