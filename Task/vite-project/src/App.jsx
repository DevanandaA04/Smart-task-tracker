import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false }
    ]);

    setTask("");
  };

  
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        padding: "20px",
        boxSizing: "border-box",
        transition: "all 0.3s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
      }}
    >
      <div style={{ maxWidth: "800px", width: "100%" }}>
        <h2 style={{ textAlign: "center" }}>Smart Task Tracker</h2>

       
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "20px"
          }}
        >
         
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={btnStyle(darkMode)}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              padding: "8px",
              width: "250px",
              backgroundColor: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#000",
              border: "1px solid gray"
            }}
          />


          <button onClick={addTask} style={btnStyle(darkMode)}>
            Add
          </button>

          <button onClick={() => setFilter("all")} style={btnStyle(darkMode)}>
            All
          </button>
          <button onClick={() => setFilter("completed")} style={btnStyle(darkMode)}>
            Completed
          </button>
          <button onClick={() => setFilter("pending")} style={btnStyle(darkMode)}>
            Pending
          </button>
        </div>

        
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTasks.map((t) => (
            <li
              key={t.id}
              style={{
                margin: "10px 0",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: darkMode ? "#2c2c2c" : "#f2f2f2",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span
                onClick={() => {
                  const newTasks = tasks.map((taskItem) =>
                    taskItem.id === t.id
                      ? { ...taskItem, completed: !taskItem.completed }
                      : taskItem
                  );
                  setTasks(newTasks);
                }}
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  cursor: "pointer"
                }}
              >
                {t.text}
              </span>

              <button
                onClick={() => {
                  const newTasks = tasks.filter(
                    (taskItem) => taskItem.id !== t.id
                  );
                  setTasks(newTasks);
                }}
                style={btnStyle(darkMode)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


const btnStyle = (darkMode) => ({
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "6px",
  border: "none",
  backgroundColor: darkMode ? "#444" : "#ddd",
  color: darkMode ? "#fff" : "#000"
});

export default App;