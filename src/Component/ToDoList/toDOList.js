import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
    const list = localStorage.getItem("toDoList");
    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const ToDOList = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);
    const addItems = () => {
        if (!inputData) {
            alert('Plz fill The data')
        } else if (inputData && toggleButton) {
            setItems(
                items.map((currEle) => {
                    if (currEle.id === isEditItem) {
                        return { ...currEle, name: inputData };
                    }
                    return currEle;
                })
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewItems = {
                id: new Date().getTime().toString(),
                name: inputData,
            };
            setItems([...items, myNewItems]);
            setInputData("");
        }
    }
    const deleteItems = (id) => {
        const updatedItems = items.filter((currEle) => {
            return currEle.id !== id;
        })
        setItems(updatedItems);
    }
    const editItems = (id) => {
        const item_todo_edited = items.find((currEle) => {
            return currEle.id === id;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(id);
        setToggleButton(true);
    }
    const removeAll = () => {
        setItems([]);
    }
    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todo logo" srcset="" />
                        <figCaption>Add your list here.</figCaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍ Note something' className='form-control' value={inputData} onChange={(event) => setInputData(event.target.value)} />
                        {toggleButton ?
                            (<i class="fa fa-edit add-btn" onClick={addItems}></i>) :
                            (<i class="fa fa-plus add-btn" onClick={addItems}></i>)
                        }
                    </div>
                    {/* Add all button */}

                    <div className="showItem">
                        {
                            items.map((currEle, index) => {
                                return (
                                    <div className="eachItem" key={currEle.id}>
                                        <h3>{currEle.name}</h3>
                                        <i class="far fa-edit add-btn" onClick={() => editItems(currEle.id)}></i>
                                        <i class="far fa-trash-alt add-btn" onClick={() => deleteItems(currEle.id)}></i>
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* remove all button */}
                    <div className="showItems"><button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button></div>
                </div>
            </div>

        </>
    )
}

export default ToDOList
