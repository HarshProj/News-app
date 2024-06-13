import './App.css';
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';
import React, { useState, Usestate } from 'react'
import News from './components/News';
import{
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom"
const App=()=>  {
  const pagesi=5;
  const apikey="e3480f18fa3a4820bae3c9422310efee"
  // state={
  //   progress:0
  // }
  const [progress,setProgress]=useState(0);
  // setProgress=(progress)=>{
  //   setState({progress:progress})
  // // }
  // render() {
    return (
      <Router>

      <div>
          <Navbar />
          <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}  
      />
          <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="technology" />} />
         </Routes>

          <Routes>
          <Route exact path="/bussiness" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="bussiness" />} />
         </Routes>

          <Routes>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="entertainment" />} />
         </Routes>
          {/* note in v6 of react router dom we dont need to use key here to navigate from one to another */}
          <Routes>
          <Route exact path="/health" key="health" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="health" />} />
         </Routes>

          <Routes>
          <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="general" />} />
         </Routes>

          <Routes>
          <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="science" />} />
         </Routes>

          <Routes>
          <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="sports" />} />
         </Routes>

          <Routes>
          <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} pagesize={pagesi} country="in" category="technology" />} />
         </Routes>
      </div>
         </Router>

    )
  }
// }
export default App;
