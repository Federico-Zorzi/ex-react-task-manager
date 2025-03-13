import { BrowserRouter, Routes, Route } from "react-router";

import DefaultLayout from "./layouts/DefaultLayout";

/* import pages */
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";

import { TaskContextProvider } from "./context/taskContext";

function App() {
  return (
    <TaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={TaskList}></Route>
            <Route path="/addTask" Component={AddTask}></Route>
            <Route path="/task/:id" Component={TaskDetail}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskContextProvider>
  );
}

export default App;
