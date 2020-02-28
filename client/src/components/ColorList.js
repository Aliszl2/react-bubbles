import React, { useState } from "react";
// import axios from "axios";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import uuid from "uuid"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, fetchColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color:"",
    code:{hex:""},
    id:uuid() 
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };


  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      setEditing(false);
      setColorToEdit(initialColor);
      fetchColors();
    })
    .catch(error => {
      debugger;
      console.error(error);
    });
  };

 
  const handleSubmitNewColor = e => {
    e.preventDefault();
    console.log(e.target.name);
 
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, newColor)
    .then(res => {
            updateColors(
{
  color: "", code: {hex:""}
}

      );
      fetchColors();
    })
    .catch(error => {
      debugger;
      console.error(error);
    });
  };


  const deleteColor = id => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${id}, colors`)
    .then(response => {
      updateColors(colors.filter(color => color.id !== id));
    })

    .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button
    
      >Add color</button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color.id)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form>
          <legend>Add color</legend>
          <label>
            color name:
            <input
            value={newColor.value}
             onChange={e =>{

               console.log(e.target.value)
               setNewColor({ ...newColor, color: e.target.value })
             }
            }
            />
          </label>
          <label>
            hex code:
            <input 
            value={newColor.code.hex}
            onChange={e =>{

              console.log(e.target.value)
              setNewColor({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            }
            />
          </label>
          <div className="button-row">
            <button 
            handleSubmitNewColor={e=>handleSubmitNewColor(newColor)}
            type="submit">save</button>
           
          </div>
        </form>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={saveEdit} type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
  
 
      
    </div>
  );
};

export default ColorList;
