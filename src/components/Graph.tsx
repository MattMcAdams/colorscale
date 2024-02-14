import { useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 20, right: 20, bottom: 20, left: 20 };

type DataPoint = { x: number; y: number; hex: string };
type ConnectedScatterplotProps = {
  width: number;
  height: number;
  yDomain: [number, number];
  data: DataPoint[];
};

export const ConnectedScatterplot = ({
  width,
  height,
  data,
  yDomain,
}: ConnectedScatterplotProps) => {

  // bounds = area inside the graph axis = calculated by substracting the margins
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis
  // const [min, max] = d3.extent(data, (d) => d.y);
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([boundsHeight, 0]);

  // X axis
  const [xMin, xMax] = d3.extent(data, (d) => d.x);
  const xScale = d3
    .scaleLinear()
    .domain([0, xMax || 0])
    .range([0, boundsWidth])

  // Render the X and Y axis using d3.js, not react
  // useEffect(() => {
  //   const svgElement = d3.select(axesRef.current);
  //   svgElement.selectAll("*").remove();
  //   const xAxisGenerator = d3.axisBottom(xScale).tickValues([]);
  //   svgElement
  //     .append("g")
  //     .attr("transform", "translate(0," + boundsHeight + ")")
  //     .call(xAxisGenerator);

  //   const yAxisGenerator = d3.axisRight(yScale);
  //   svgElement.append("g").call(yAxisGenerator);
  // }, [xScale, yScale, boundsHeight]);

  // Build the line
  const lineBuilder = d3
    .line<DataPoint>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);
  if (!linePath) {
    return null;
  }

  // Build the circles
  const allCircles = data.map((item, i) => {
    return (
      <circle
        key={i}
        cx={xScale(item.x)}
        cy={yScale(item.y)}
        r={6}
        fill={item.hex}
      />
    );
  });

  return (
    <div className="rounded-lg border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300">
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={0.3}
            stroke="#ccc"
            fill="none"
            strokeWidth={2}
          />
          {allCircles}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};
