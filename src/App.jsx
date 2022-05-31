import Gantt from "./components/Gantt";

function App() {
    const time = new Date("2020-12-01T00:00:00");
    const hello = "hello";
    return (
        <div className="App">
            <Gantt />
            <div>{time.toString()}</div>
            <div>{time.toISOString()}</div>
            <div>{time.toLocaleString()}</div>
        </div>
    );
}

export default App;
