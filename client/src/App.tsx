import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "./components/ui/button";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            Hello
            <Button>Click Me</Button>
        </>
    );
}

export default App;
