import React from "react";
import { useDrag } from "react-dnd";

const DraggableTool = ({ tool }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "TOOL",
    item: { name: tool.name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        width: "120px",
        height: "140px",
        margin: "12px auto",
        borderRadius: "18px",
        padding: "14px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #e0e0e0",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
        transition: "transform 0.2s ease-in-out",
        textAlign: "center",
      }}
    >
      <img
        src={tool.image}
        alt={tool.name}
        style={{
          width: "48px",
          height: "48px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />
      <span
        style={{
          fontSize: "13px",
          color: "#333",
          fontWeight: "600",
          fontFamily: "Segoe UI, sans-serif",
          lineHeight: "1.2",
        }}
      >
        {tool.name}
      </span>
    </div>
  );
};

export default DraggableTool;
