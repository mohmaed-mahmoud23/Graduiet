// src/components/DropZone.jsx
import React, { useState } from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ zone, onDrop, style, removeItem }) => {
  const [droppedItem, setDroppedItem] = useState(null);
  const [flash, setFlash] = useState(false);

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: "TOOL",
    drop: (item) => {
      // عند الإسقاط
      setDroppedItem(item);
      setFlash(true);
      onDrop(zone, item);
      // حذف الصورة من القائمة الأصلية
      if (removeItem) {
        removeItem(item);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        ...style,
        backgroundColor: flash
          ? "rgba(255, 255, 0, 0.4)"
          : canDrop
          ? "rgba(0, 255, 255, 0.1)"
          : "transparent",
        border: "2px dashed gray",
        borderRadius: "10px",
        minHeight: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.3s ease",
      }}
    >
      {droppedItem && (
        <img
          src={droppedItem.image}
          alt={droppedItem.name}
          style={{ width: "60px", height: "60px", objectFit: "contain" }}
        />
      )}
    </div>
  );
};

export default DropZone;
