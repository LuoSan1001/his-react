import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "react-flow-renderer";
import { saveMindMap, loadMindMap } from "./storage";
 
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "2024.3.1~2024.4.25" },
    position: { x: 400, y: 0 },
    style: { border: "2px solid #ff780e" },
  },
  {
    id: "2",
    // type: "input",
    data: { label: "测试用例1" },
    position: { x: 110, y: 150 },
    // style: { border: "20px solid #9999" },
  },
  {
    id: "3",
    // type: "input",
    data: { label: "2" },
    position: { x: 310, y: 150 },
    // style: { border: "20px solid #9999" },
  },
  {
    id: "4",
    // type: "input",
    data: { label: "测试用例3" },
    position: { x: 544, y: 220 },
    // style: { border: "20px solid #9999" },
  },
  {
    id: "5",
    // type: "input",
    data: { label: "测试用例4" },
    position: { x: 710, y: 150 },
    // style: { border: "20px solid #9999" },
  },
  {
    id: "6",
    // type: "input",
    data: { label: "测试用例2-1" },
    position: { x: 310, y: 250 },
    // style: { border: "20px solid #9999" },
  },
];
const initialEdges: any = [
    {
        id: "reactflow__edge-1-2",
        source: "1",
        target: "2",
        type: "mindmap",
        style: {color: "black"},
    },
    {
        id: "reactflow__edge-1-3",
        source: "1",
        target: "3",
        type: "mindmap",
        style: {color: "black"},
    },
    {
        id: "reactflow__edge-1-4",
        source: "1",
        target: "4",
        type: "custom-edge",
        style: {color: "black"},
    },
    {
        id: "reactflow__edge-1-5",
        source: "1",
        target: "5",
        // type: "mindmap",
        style: {color: "black"},
    },
    {
        id: "reactflow__edge-3-6",
        source: "3",
        target: "6",
        // type: "mindmap",
        style: {color: "black"},
    },
];
const onLoad = (reactFlowInstance: any) => {
  reactFlowInstance.fitView();
};
 
export default function MindNode() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState("");
 
  const addNode = () => {
    setNodes((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: 0,
          y: 0,
        },
        // style: { border: "10px solid #ffffff" },
      })
    );
  };
 
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const handleSaveClick = () => {
    saveMindMap(nodes, edges);
    console.log(nodes);
  };
  const handleLoadClick = () => {
    const loadedData = loadMindMap();
    if (loadedData) {
      setNodes(loadedData.nodes);
      setEdges(loadedData.edges);
      console.log(loadedData);
    }
  };
 
  const refreshPage = () => {
    window.location.reload();
  };
  // const nodeOrigin = [0.5, 0.5];
  const connectionLineStyle = {
    stroke: "#9999",
    strokeWidth: 3,
    
  };
  const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };
 
  return (
    <div id="container" style={{width: '1200px', height: '600px'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
        onLoad={onLoad}
      >
        <Controls />
        <Background gap={12} size={1} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";
 
            return "#FFCC00";
          }}
        />
      </ReactFlow>
      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="title"
        />
        <button id="one" type="button" onClick={addNode}>
          Add Node
        </button>
      </div>
      <div>
        <button id="two" onClick={handleSaveClick}>
          Save Mind Map
        </button>
        <button id="three" onClick={handleLoadClick}>
          Load Mind Map
        </button>
        <button id="four" onClick={refreshPage}>
          Refresh
        </button>
      </div>
    </div>
  );
}
