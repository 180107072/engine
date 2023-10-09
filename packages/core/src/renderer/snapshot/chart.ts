import * as d3 from "d3";
import type { D3DragEvent, SubjectPosition } from "d3";

type Data = {
  links: any[];
  nodes: any[];
};

type D = {
  fx: number | null;
  fy: number | null;
  index: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type UseDragEvent = D3DragEvent<HTMLDivElement, null, SubjectPosition>;

const drag = (simulation: d3.Simulation<any, undefined>) => {
  function dragstarted(event: UseDragEvent, d: D) {
    console.log(d);
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: UseDragEvent, d: D) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event: UseDragEvent, d: D) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3
    .drag<SVGSVGElement, any>()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const node_color = "#888";
const height = 200;
const width = 200;
export const chart = (data: Data) => {
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d: any) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .create("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", 0.5);

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 4)
    .attr("fill", node_color)
    .call(drag(simulation) as any);

  node.append("title").text((d) => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node
      .attr("cx", (d) => {
        return d.x;
      })
      .attr("cy", (d) => {
        return d.y;
      });
  });

  return svg.node();
};
