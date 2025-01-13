export const saveMindMap = (nodes: any, edges: any) => {
    const data = { nodes, edges };
    localStorage.setItem("mindMapData", JSON.stringify(data));
};

export const loadMindMap = () => {
    const data = localStorage.getItem("mindMapData");
    return data ? JSON.parse(data) : null;
};
