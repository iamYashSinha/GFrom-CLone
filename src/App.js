// import React from 'react'
// import Header from './components/Header';
// import Template from './components/Template';
// import Mainbody from './components/Mainbody';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Formheader from './components/Formheader';
// import Question_form from './components/Question_form';
// import Centeredtab from './components/Tabs';

// function App() {
//   return (
//     <div className="app">

// <Router>
//   <Routes>
//     <Route path="/" element={
//       <>
//         <Header />
//         <Template />
//         <Mainbody />
//       </>
//     } />

//     <Route path='/form/:id' element={
//       <>
//     <Formheader />
//     <Centeredtab />
//     <Question_form/>
//       </>
//     } />
//   </Routes>
// </Router>


//     </div>
//   );
// }

// export default App;

import React from "react";

import Signin from "./components/Signin";

function App() {
  return (
    <div className="app">
      <Signin />
    </div>
  );
}

export default App;