import React, { useContext } from "react";
import { DragContext } from "../utils/DragContext";

export const DragNDrop = ({ children, id, widgetI, setDisplayStockList }) => {
  const [dragging, setDragging, dragItem, dragNode, enteredNode] =
    useContext(DragContext);

  const handleDragStart = (e, params) => {
    const { widgetI } = params;
    dragItem.current = widgetI;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => setDragging(true), 0);
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    const dragItemI = dragItem.current;
    const enteredNodeI = enteredNode.current;
    if (typeof dragItemI === "number" && typeof enteredNodeI === "number") {
      setDisplayStockList((prevList) => {
        let newList = JSON.parse(JSON.stringify(prevList));
        [newList[enteredNodeI], newList[dragItemI]] = [
          newList[dragItemI],
          newList[enteredNodeI],
        ];
        localStorage.setItem("stockList", JSON.stringify(newList));
        return newList;
      });
      dragNode.current.removeEventListener("dragend", handleDragEnd);
      dragItem.current = null;
      dragNode.current = null;
      enteredNode.current = null;
    }
  };

  const handleDragEnter = (e, params) => {
    let { widgetI } = params;
    const currentItem = dragItem.current;
    if (currentItem !== widgetI && enteredNode.current != currentItem) {
      enteredNode.current = widgetI;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      key={id}
      draggable
      value={id}
      onDragOver={handleDragOver}
      onDragStart={(e) => handleDragStart(e, { widgetI })}
      onDragEnter={dragging ? (e) => handleDragEnter(e, { widgetI }) : null}
      className="flex mt-5 cursor"
    >
      {children}
    </div>
  );
};
