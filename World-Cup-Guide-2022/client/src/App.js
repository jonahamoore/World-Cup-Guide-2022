import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import {ApplicationViews} from "./components/ApplicationViews"
import {WorldCupHeader} from "./header/WorldCupHeader";
import {CollapsableNav} from "./Nav/NavBar"

function App() {
  return (
    <Router>
      <UserProfileProvider>          
          <WorldCupHeader />
            <CollapsableNav />
          <ApplicationViews />         
      </UserProfileProvider>
    </Router>
  );
}

export default App;