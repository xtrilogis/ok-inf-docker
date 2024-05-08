import './App.css';
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import Songs from "./components/Songs";

function App() {
  const divStyle = {
    marginLeft: "40px",
  };

  return (
    <ChakraProvider >
      <Header title={"Title"} />
      <div style={divStyle}><Songs /></div>
    </ChakraProvider>
  )
}

export default App;
