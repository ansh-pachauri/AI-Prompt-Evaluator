import * as d3 from "d3";
import { DataItem } from "@/src/types/types";

const arcGenerator = d3.arc();
const INFLEXION_PADDING = 40;

const colors = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#f43f5e", // rose
];

export default function DonutSlice({
  grp,
  i,
  radius,
  innerRadius,
}: {
  grp: d3.PieArcDatum<DataItem>;
  i: number;
  radius: number;
  innerRadius: number;
}) {
  const sliceInfo = {
    innerRadius,
    outerRadius: radius,
    startAngle: grp.startAngle,
    endAngle: grp.endAngle,
    padAngle: 0.025,
  };

  const centroid = arcGenerator.centroid(sliceInfo);
  const slicePath = arcGenerator(sliceInfo);

  const inflexionInfo = {
    innerRadius: radius + INFLEXION_PADDING,
    outerRadius: radius + INFLEXION_PADDING,
    startAngle: grp.startAngle,
    endAngle: grp.endAngle,
  };
  const inflexionPoint = arcGenerator.centroid(inflexionInfo);

  const isRightLabel = inflexionPoint[0] > 0;
  const labelPosX = inflexionPoint[0] + 70 * (isRightLabel ? 1 : -1);
  const textAnchor = isRightLabel ? "start" : "end";
  const label = `${grp.data.name} (${grp.value})`;

  return (
    <g key={i} className="transition-all duration-300 hover:scale-[1.02]">
      <path
        d={`${slicePath}`}
        fill={colors[i % colors.length]}
        stroke="#09090b"
        strokeWidth={2.5}
        style={{
          filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.15))",
          transition: "all 0.3s ease",
        }}
      />
      <line
        x1={centroid[0]}
        y1={centroid[1]}
        x2={inflexionPoint[0]}
        y2={inflexionPoint[1]}
        stroke="#52525b"
        strokeWidth={1}
      />
      <line
        x1={inflexionPoint[0]}
        y1={inflexionPoint[1]}
        x2={labelPosX}
        y2={inflexionPoint[1]}
        stroke="#52525b"
        strokeWidth={1}
      />
      <text
        x={labelPosX + (isRightLabel ? 4 : -4)}
        y={inflexionPoint[1]}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        fontSize={13}
        fontWeight={500}
        fill="#a1a1aa"
        style={{ fontFamily: "Geist, Inter, sans-serif" }}
      >
        {label}
      </text>
    </g>
  );
}
