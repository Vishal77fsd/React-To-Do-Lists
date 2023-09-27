import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [task, setTask] = useState("");
  const [doneTask, setDoneTask] = useState([]);

  // Adding All The List
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("itemList"));
    if (temp.length === 0) {
      temp.push("Do something that will take you up");
      temp.push("Go to market and bring dhaniya");
      temp.push("Wake up at 5'o clock sab thik ho jyga");
      temp.push("Do five push up daily");
      temp.push("Ram Ram saryana");
      localStorage.setItem("itemList", JSON.stringify(temp));
    }
    setToDoList(temp);
  }, []);

  function handleAdd() {
    toDoList.push(task);
    addListToLocalStorage();
    setTask("");
  }

  function addListToLocalStorage() {
    if (localStorage.getItem("itemList")) {
      let temp = JSON.parse(localStorage.getItem("itemList"));
      temp = [task, ...temp];
      setToDoList(temp);
      localStorage.setItem("itemList", JSON.stringify(temp));
    } else {
      localStorage.setItem("itemList", JSON.stringify(toDoList));
      let temp = JSON.parse(localStorage.getItem("itemList"));
      setToDoList(temp);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      toDoList.push(task);
      addListToLocalStorage();
      setTask("");
    }
  }

  function handleDone(e) {
    // Removing task from state
    let removeTask = e.target.parentElement.value;

    if (removeTask !== undefined) {
      setToDoList(toDoList.filter((list) => list !== removeTask));

      let oldTask = JSON.parse(localStorage.getItem("itemList"));
      oldTask = oldTask.filter((task) => removeTask !== task);
      localStorage.setItem("itemList", JSON.stringify(oldTask));
      setDoneTask((prev) => {
        return [removeTask, ...prev];
      });
    }
  }

  return (
    <div>
      <h1 className="bg-gray-300 text-3xl p-6 text-center font-bold font-poppins">
        To Do List
      </h1>

      <div className="bg-gray-500 p-4 font-poppins w-full">
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-4 w-[80%]"
        />
        <button
          className="text-center bg-red-400 p-4 w-[20%] hover:bg-red-500 transition-colors"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div className="bg-gray-700 font-poppins p-4">
        {toDoList.length > 0 &&
          toDoList.map((list, index) => (
            <div
              key={index}
              className="border md:max-w-[80%] sm:max-w-[90%] m-auto mb-4 hover:bg-red-300"
            >
              <div className="flex justify-between items-center hover:text-black p-4 text-white text-md animate-fromRight">
                <h1>{list}</h1>
                <button onClick={handleDone} value={list}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

        {doneTask.length > 0 &&
          doneTask.map((list, index) => (
            <div
              key={index}
              className="border bg-red-500 md:max-w-[90%] sm:max-w-[60%] m-auto mb-4 animate-fromLeft"
            >
              <div className="flex justify-between items-center p-4 text-white text-md ">
                <h1 className="line-through">{list}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
