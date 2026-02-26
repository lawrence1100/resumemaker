import './App.css';
import { BrowserRouter } from "react-router-dom";
import ResumeMaker from './resume-maker';
import GATracker from "./analytics/ga";

function App() {
  return (
    <BrowserRouter>
      <GATracker />
      <ResumeMaker />
    </BrowserRouter>
    // <>
    //   <ResumeMaker />
    // </>

  );
}

export default App;