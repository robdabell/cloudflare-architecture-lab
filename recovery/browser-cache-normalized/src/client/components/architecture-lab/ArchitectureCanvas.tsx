import { Background, ReactFlow, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ArchitectureNode } from "@/shared/contracts";
import { ServiceNode } from "./ServiceNode";
const nodeTypes = { service: ServiceNode };
export function ArchitectureCanvas({ nodes }: { nodes: ArchitectureNode[] }) {
  const flowNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    type: "service",
    position: { x: node.positionX, y: node.positionY },
    data: node,
    draggable: false,
    selectable: false,
  }));
  const edges: Edge[] = nodes.slice(1).map((node, index) => ({
    id: `${nodes[index].id}-${node.id}`,
    source: nodes[index].id,
    target: node.id,
    animated: false,
  }));
  return (
    <div
      className="h-[420px] overflow-hidden rounded-2xl border border-border bg-slate-950"
      aria-label="Read-only architecture diagram"
    >
      <ReactFlow
        nodes={flowNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll
      >
        <Background color="#334155" />
      </ReactFlow>
    </div>
  );
}
