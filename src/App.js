import React, { useState } from "react";
import "./App.css";
import NavigationBar from "./components/Navigation/Navigation";
import CardNewTask from "./components/Cards/CardNewTask";
import CardList from "./components/Cards/CardList";

function App() {
    const [ createTask, setCreateTask ] = useState(null);
    const [ filterTask, setfilterTask ] = useState(null);
    const [ filterTaskColor, setfilterTaskColor ] = useState(null);

    return (
        <>
            <NavigationBar setfilterTask={ setfilterTask }  setfilterTaskColor={ setfilterTaskColor }/>
            <main>
                <section className="createTask">
                    <CardNewTask setCreateTask={ setCreateTask } />
                </section>
                <section className="viewTask">
                    <CardList createTask={ createTask } filterTask={ filterTask } filterTaskColor={ filterTaskColor } />
                </section>
            </main>
        </>
    );
}

export default App;
