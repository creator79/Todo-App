import React, { useCallback } from 'react'
import {useState,useEffect} from 'react'
import Task from './Task'

function TaskList() {
    const [posts,setPosts] = useState([]);

    const Load = () => {
        fetchData()
    }

    const fetchData = useCallback(async () => {
    // stop the use effect from running again
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setPosts(data);
    },[])
    


    const deleteTask = (id) => {
        const newPosts = posts.filter(post => post.id !== id);
        setPosts(newPosts);
    }

    const notCompleted = () => {
         const arr = posts.filter(post => !post.completed)
         setPosts(arr)
    }

    const rearrange = () => {
        let completedTasks = [];
        let uncompletedTasks = [];
        posts.forEach((task) => {
            if (task.completed) {
    
                completedTasks.push(task);
            } else {
                uncompletedTasks.push(task);
            }
        });
        setPosts([...uncompletedTasks, ...completedTasks]);
    };

    const capitalize = () => {
        let arr = posts.map((task) => {
            let title = task.title;
            let firstLetter = title[0].toUpperCase();
            let restOfTitle = title.slice(1);
            let newTitle = firstLetter + restOfTitle;
            return { ...task, title: newTitle };
        });
        setPosts(arr);
    };

  return (
    <>
        <button onClick={Load}>Load</button>
        <h1>Welcome to our Todo App</h1>
        {
            posts.map((item)=>{
                return <Task key={item.id} task={item} deleteTask={deleteTask} />
            })
        }
        <button onClick={()=>capitalize()}>{"Capitalize tasks"}</button>
        <button onClick={()=>rearrange()}>{"ReArrange"}</button>
        <button onClick={()=>notCompleted()}>{"Clear Completed Tasks"}</button>
    </>
    )
}

export default TaskList
