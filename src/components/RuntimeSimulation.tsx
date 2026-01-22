import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    ReferenceLine,
    ReferenceDot
} from "recharts";
import { Play, Pause, RotateCcw, Zap, ChevronRight, Activity } from "lucide-react";

const RuntimeSimulation = () => {
    const [n, setN] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const animationRef = useRef<number>();

    // Helper for factorial
    const factorial = (num: number) => {
        let val = 1;
        for (let i = 2; i <= Math.floor(num); i++) val *= i;
        return val;
    };

    // Algorithms configuration
    const algorithms = [
        { id: 'constant', name: 'O(1)', label: 'Constant', color: '#9ca3af', func: (x: number) => 1 },
        { id: 'logn', name: 'O(log n)', label: 'Logarithmic', color: '#34d399', func: (x: number) => Math.log2(Math.max(1, x)) },
        { id: 'sqrtn', name: 'O(√n)', label: 'Square Root', color: '#2dd4bf', func: (x: number) => Math.sqrt(Math.max(0, x)) },
        { id: 'n', name: 'O(n)', label: 'Linear', color: '#60a5fa', func: (x: number) => x },
        { id: 'nlogn', name: 'O(n log n)', label: 'Log-Linear', color: '#fbbf24', func: (x: number) => x * Math.log2(Math.max(1, x)) },
        { id: 'quadratic', name: 'O(n²)', label: 'Quadratic', color: '#f87171', func: (x: number) => x * x },
        { id: 'exponential', name: 'O(2ⁿ)', label: 'Exponential', color: '#c084fc', func: (x: number) => Math.pow(2, x) },
        { id: 'factorial', name: 'O(n!)', label: 'Factorial', color: '#e11d48', func: (x: number) => factorial(x) },
    ] as const;

    // Simulation Loop (Auto-increment N)
    useEffect(() => {
        if (isPlaying) {
            let lastTime = performance.now();
            const animate = (time: number) => {
                const delta = time - lastTime;
                if (delta > 50) { // Limit update rate
                    setN(prev => {
                        if (prev >= 50) {
                            setIsPlaying(false);
                            return 50;
                        }
                        return prev + 0.2; // Smooth fractional increment
                    });
                    lastTime = time;
                }
                animationRef.current = requestAnimationFrame(animate);
            };
            animationRef.current = requestAnimationFrame(animate);
        } else {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const reset = () => {
        setIsPlaying(false);
        setN(1);
    };

    // Calculate current stats for the display using Math.round for display
    const currentStats = algorithms.map(alg => ({
        ...alg,
        value: Math.round(alg.func(n))
    }));

    // Generate chart data - static background curve
    const chartData = Array.from({ length: 51 }, (_, i) => {
        const point: any = { x: i };
        algorithms.forEach(alg => {
            point[alg.id] = alg.func(i);
        });
        return point;
    });

    return (
        <motion.section
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-8 md:p-10"
        >
            {/* Header / Controls Area */}
            <div className="mb-8 pb-8 border-b border-white/10 flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                        <span className="text-gradient">Runtime Complexity Simulator</span>
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground/70">
                        See how operation counts diverge as Input Size (N) increases
                    </p>
                </div>

                    {/* Sim Controls */}
                    <div className="flex items-center gap-4 bg-background/40 p-2 pr-4 rounded-full border border-white/10">
                        <motion.button
                            onClick={togglePlay}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${isPlaying
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
                                : "bg-emerald-500 text-background hover:bg-emerald-400 border border-emerald-500/30"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                        </motion.button>

                        <div className="flex flex-col min-w-[140px]">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Input Size (N)</span>
                                <span className="font-mono font-bold text-emerald-400">{Math.floor(n)}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                step="0.1"
                                value={n}
                                onChange={(e) => {
                                    setN(Number(e.target.value));
                                    setIsPlaying(false);
                                }}
                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400"
                            />
                        </div>

                        <motion.button
                            onClick={reset}
                            className="p-3 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RotateCcw className="w-4 h-4" />
                        </motion.button>
                    </div>
            </div>

                <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

                    {/* Left Panel: Real-time Stats */}
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="w-4 h-4 text-emerald-400" />
                            <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-muted-foreground/60">Live Operations Count</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {currentStats.map(stat => (
                                <div key={stat.id} className="group flex flex-col p-3 rounded-xl border border-white/10 bg-background/40 hover:border-white/20 hover:bg-background/60 transition-all cursor-hover">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: stat.color }} />
                                        <div>
                                            <div className="font-bold font-mono text-xs leading-none mb-0.5" style={{ color: stat.color }}>{stat.name}</div>
                                            <div className="text-[9px] text-muted-foreground">{stat.label}</div>
                                        </div>
                                    </div>
                                    <div className="text-right mt-auto">
                                        <div className="font-mono font-bold text-sm">
                                            {stat.value >= 1e9 ? '∞' : stat.value.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mini Insight */}
                        <div className="mt-8 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                            <div className="flex items-start gap-3">
                                <Zap className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                <p className="text-xs text-muted-foreground/80">
                                    At <span className="text-foreground font-bold">N={Math.floor(n)}</span>, simple factorial time usually
                                    <span className="text-red-400 font-bold mx-1">
                                        crashes
                                    </span>
                                    any computer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: The Graph */}
                    <div className="lg:col-span-2 p-6 md:p-8 relative min-h-[400px]">
                        <div className="absolute top-6 right-8 z-10 bg-background/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs text-muted-foreground/70 pointer-events-none">
                            <span className="text-emerald-400">●</span> Live Tracking
                        </div>

                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="x"
                                    type="number"
                                    domain={[0, 50]}
                                    tick={{ fill: "#666", fontSize: 10 }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                />
                                <YAxis
                                    domain={[0, 50]}
                                    allowDataOverflow={true}
                                    tick={{ fill: "#666", fontSize: 10 }}
                                    axisLine={{ stroke: "#333" }}
                                    tickLine={false}
                                // Hide large numbers on Y axis to keep it clean, the tooltip/side panel handles details
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                                    itemStyle={{ fontSize: '12px', padding: '2px 0' }}
                                    labelStyle={{ color: '#a1a1aa', marginBottom: '8px' }}
                                    formatter={(val: number) => [val.toLocaleString(), 'ops']}
                                />

                                {/* Static Curves */}
                                {algorithms.map(alg => (
                                    <Line
                                        key={alg.id}
                                        type="monotone"
                                        dataKey={alg.id}
                                        stroke={alg.color}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={false}
                                        isAnimationActive={false}
                                        opacity={0.6}
                                    />
                                ))}

                                {/* Live Vertical Cursor Line */}
                                <ReferenceLine x={n} stroke="#fff" strokeDasharray="3 3" opacity={0.5} />

                                {/* Live active dots - with Safety Clamping to prevent crash */}
                                {algorithms.map(alg => {
                                    const val = alg.func(n);
                                    // CRITICAL FIX: Do not render ReferenceDot if value is way out of bounds.
                                    // Rendering a dot at y=1e15 crashes the browser render/SVG engine.
                                    if (val > 60) return null;

                                    return (
                                        <ReferenceDot
                                            key={`dot-${alg.id}`}
                                            x={n}
                                            y={val}
                                            fill={alg.color}
                                            stroke="#000"
                                            strokeWidth={2}
                                            r={6}
                                        />
                                    );
                                })}

                            </LineChart>
                        </ResponsiveContainer>

                        <div className="flex justify-between text-[10px] text-muted-foreground/70 mt-2 px-2">
                            <span>0</span>
                            <span>Input Size (N)</span>
                            <span>50</span>
                        </div>
                    </div>
                </div>
        </motion.section>
    );
};

export default RuntimeSimulation;
