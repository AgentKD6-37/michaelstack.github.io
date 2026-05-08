import React, { useEffect, useRef } from "react";
import constellation from "./data/constellation.json";

const StarShape = ({ x, y, size = 1, delay = 0 }) => {
    // Scale scale based on size prop
    const scale = size * 1.5;

    return (
        <g
            transform={`translate(${x}, ${y}) scale(${scale})`}
            style={{ animation: `pulse 3s infinite ease-in-out ${delay}s` }}
        >
            {/* Outer large diffuse glow (cyan/teal tint) */}
            <circle cx="0" cy="0" r="8" fill="url(#star-gradient)" opacity="0.4" />

            {/* Main diffraction spikes (Vertical/Horizontal) */}
            <path
                d="M 0 -12 C 1 -3 1 -3 3 0 C 1 3 1 3 0 12 C -1 3 -1 3 -3 0 C -1 -3 -1 -3 0 -12 Z"
                fill="white"
            />

            {/* Secondary diagonal spikes (smaller) */}
            <path
                d="M 0 -6 C 0.5 -1.5 0.5 -1.5 1.5 0 C 0.5 1.5 0.5 1.5 0 6 C -0.5 1.5 -0.5 1.5 -1.5 0 C -0.5 -1.5 -0.5 -1.5 0 -6 Z"
                fill="white"
                opacity="0.7"
                transform="rotate(45)"
            />

            {/* Intense hot core */}
            <circle cx="0" cy="0" r="1.5" fill="white" filter="url(#core-glow)" />
        </g>
    );
};

export default function StarMap() {
    const svgRef = useRef(null);

    // Update SVG size on resize
    useEffect(() => {
        const updateSize = () => {
            if (svgRef.current) {
                const { innerWidth, innerHeight } = window;
                svgRef.current.setAttribute("width", innerWidth);
                svgRef.current.setAttribute("height", innerHeight);
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Convert normalized coordinates (0-1) to pixel positions
    const toPx = (p) => ({
        x: p.x * window.innerWidth,
        y: p.y * window.innerHeight,
    });

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-space">
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1.5); opacity: 1; }
                    50% { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(1.3); opacity: 0.8; }
                }
            `}</style>

            {/* Space background */}
            <img
                src="/space-bg.png"
                alt="Space background"
                className="absolute inset-0 h-full w-full object-cover z-0 opacity-60"
            />

            {/* Optional: Radial Gradient Overlay for "Nebula" effect behind the constellation */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />

            {/* Constellation SVG */}
            <svg ref={svgRef} className="absolute inset-0 pointer-events-none z-10">
                <defs>
                    {/* Gradient for star outer glow */}
                    <radialGradient id="star-gradient">
                        <stop offset="0%" stopColor="rgba(200, 255, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(0, 200, 255, 0)" />
                    </radialGradient>

                    {/* Core intense glow */}
                    <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Complex Line Glow (Skyrim Teal/Cyan style) */}
                    <filter id="line-glow" x="-100%" y="-100%" width="300%" height="300%">
                        {/* Wide faint nebula aura */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                        <feFlood floodColor="rgba(45, 212, 191, 0.4)" result="color1" /> {/* Teal-400 */}
                        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />

                        {/* Mid-range distinct glow */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
                        <feFlood floodColor="rgba(103, 232, 249, 0.8)" result="color2" /> {/* Cyan-300 */}
                        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />

                        {/* Tight white/hot core glow */}
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur3" />
                        <feFlood floodColor="white" result="color3" />
                        <feComposite in="color3" in2="blur3" operator="in" result="glow3" />

                        <feMerge>
                            <feMergeNode in="glow1" />
                            <feMergeNode in="glow2" />
                            <feMergeNode in="glow3" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Edges (Lines) */}
                {constellation.edges.map(([a, b], i) => {
                    const pA = toPx(constellation.points.find((pt) => pt.id === a));
                    const pB = toPx(constellation.points.find((pt) => pt.id === b));
                    return (
                        <line
                            key={i}
                            x1={pA.x}
                            y1={pA.y}
                            x2={pB.x}
                            y2={pB.y}
                            stroke="rgba(204, 251, 241, 0.9)"
                            strokeWidth={1.5}
                            filter="url(#line-glow)"
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Points (Stars) */}
                {constellation.points.map((pt, i) => {
                    const { x, y } = toPx(pt);
                    return (
                        <StarShape
                            key={pt.id}
                            x={x}
                            y={y}
                            size={pt.size || 1}
                            delay={i * 0.2} // Staggered pulse
                        />
                    );
                })}
            </svg>
        </div>
    );
}
