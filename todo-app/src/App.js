import React,{useState,useEffect} from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsCheckCircle} from 'react-icons/bs';
import './App.css';

function App() {
  const[isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [CompletedTodos,setCompletedTodos]=useState([]);

  const handleAddTodo=()=>{
    let newTodoItem={
      title: newTitle,
      description: newDescription
    }
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };

  const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete=index=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth();
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let CompletedOn=dd+'-'+mm+'-'+yyyy+' at '+h+':'+m+':'+s;

    let filtereditem={
      ...allTodos[index],
      CompletedOn:CompletedOn
    };

    let updatedCompleteArr=[...CompletedTodos];
    updatedCompleteArr.push(filtereditem);
    setCompletedTodos(updatedCompleteArr);
    handleDeleteTodo(index);

    localStorage.setItem('completedTodos',JSON.stringify(updatedCompleteArr))
  };
  
  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...CompletedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };


  useEffect(()=>{
    let savedtodo=JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodos=JSON.parse(localStorage.getItem('completedTodos'));
    if(savedtodo){
      setTodos(savedtodo);
    }
    if(savedCompletedTodos){
      setCompletedTodos(savedCompletedTodos);
    }
  },[])
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task description?"/>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primarybtn'>ADD</button>
          </div>
        </div>
        <div className='btn-area'>
          <button className={`secondarybtn ${isCompleteScreen==false &&'active'}`} 
          onClick={()=>setIsCompleteScreen(false)}>
            Todo
          </button>
          <button className={`secondarybtn ${isCompleteScreen==true &&'active'}`} 
          onClick={()=>setIsCompleteScreen(true)}>
            Completed
          </button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return (
              <div className='todo-list-item' key={index}>
                <div className='todo-item-left'>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className='todo-item-icons'>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?'/>
                  <BsCheckCircle className='check-icon' onClick={()=>handleComplete(index)}/>
                </div>
              </div>
            )
          })}
          {isCompleteScreen===true && CompletedTodos.map((item,index)=>{
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On :{item.CompletedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title='Delete?'/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
