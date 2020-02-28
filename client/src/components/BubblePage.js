import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../auth/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  const fetchColors = () => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => {
        setColorList(res.data);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchColors();
  }, []);
  return (
    <>
      <ColorList 
      colors={colorList} 
      updateColors={setColorList} 
      fetchColors={fetchColors} 
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
