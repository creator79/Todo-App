// In this, you have to build a simple react component, where there will be a load button on top. On clicking the load button, it should load the list of todos from the API

// https://jsonplaceholder.typicode.com/todos

// And show the list of the todos task in the react component. Along with an x button.

// Below the list of todos tasks, there should be 3 more buttons,

// Capitalise, rearrange, Clear

// 1. On clicking the X button next to the task, it should delete that task from the UI

// 2. On Clicking the rearrange button, it should show all the completed tasks last and uncompleted tasks first.

// 3. On Clicking the clear button, it should remove all the tasks which were completed.

// 4. On Clicking the Capitalise button, it should capitalise each task. For example if the task is et porro tempora it should change to
import React, { Fragment, useEffect, useState } from "react";

function App() { 
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [isCapitalise, setIsCapitalise] = useState(false);
  const [isRearrange, setIsRearrange] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

 const handleclick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      setErr(error);
      setIsLoading(false);
    }
  }

  const rearrange = async  () => {
    setIsRearrange(true);
    try {
      // fetch the data from the api when the button is clicked and in api completed is true then it should be at the bottom
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      const completed = data.filter((item) => item.completed == true);
      const uncompleted = data.filter((item) => item.completed == false);
      const rearranged = uncompleted.concat(completed);
      setUser(rearranged);
      // console.log(rearranged+ 'rearranged');
      setIsRearrange(false);

         } catch (error) {
      setErr(error);
      setIsRearrange(false);

     }
    }

    const clear = async () => {
      setIsClear(true);
      try {

        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        const completed = data.filter((item) => item.completed == false);
        setUser(completed);
        setIsClear(false);
      } catch (error) {
        setErr(error);
        setIsClear(false);
      }
    }

    const capitalise = async () => {
      setIsCapitalise(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        const capitalised = data.map((item) => {
          return {
            ...item,
            title: item.title.toUpperCase()
          }
        })
        setUser(capitalised);
        setIsCapitalise(false);
      } catch (error) {
        setErr(error);
        setIsCapitalise(false);
      }
    }
    
    // const deleteItem = (id) => {
    //   return setUser(item.filter((item,i)=>
    //   {return i !==id}))
    // }

    // copy the code from the above function and change the name of the function and the name of the state variable
    const deleteItem = async (id) => {
      setIsDelete(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        const deleted = data.filter((item,i) => {
          return i !== id
        })
        setUser(deleted);
        setIsDelete(false);
      } catch (error) {
        setErr(error);
        setIsDelete(false);
      }
    }

  

    


  return (
    <>
      <button onClick={handleclick}>Load</button>
      {isLoading && <p>Loading...</p>}
      {err && <p>{err}</p>}
      {user.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.title}</p>
            <button onClick={deleteItem}>X</button>
          </div>
        )
      })}

      <button onClick={rearrange}>Rearrange</button>
      
      <button onClick={clear}>Clear</button>

      < button onClick={capitalise}>Capitalise </button>
      



    </>
  );

      }

      
export default App;
