import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Play, Pause, RotateCcw } from "lucide-react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { projectsData } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Runtime Simulation Component
const RuntimeSimulation = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentN, setCurrentN] = useState(10);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Animation: increment n from 1 to 1000, then reset
    useEffect(() => {
        if (!isPlaying) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentN((prev) => {
                if (prev >= 1000) return 1;
                return prev + 10; // Increment by 10 for smoother animation
            });
        }, 100); // Update every 100ms (10 seconds for full cycle)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying]);

    // Generate chart data up to currentN (this makes the lines grow)
    // Sample every 10 to keep data points manageable
    const chartData = [];
    for (let n = 10; n <= currentN; n += 10) {
        chartData.push({
            n,
            // O(log n) - very slow, nearly flat curve
            logn: Math.log2(n) * 100, // Scale up to be visible
            // O(n) - straight diagonal line
            linear: n,
            // O(n log n) - slightly curved above linear
            nlogn: n * Math.log2(n) / 10, // Scale down to fit
            // O(n²) - parabola, grows very fast
            quadratic: (n * n) / 1000, // Scale down significantly
        });
    }

    // Calculate current operation counts (actual values for display)
    const currentLogn = Math.round(Math.log2(Math.max(1, currentN)));
    const currentLinear = currentN;
    const currentNlogn = Math.round(currentN * Math.log2(Math.max(1, currentN)));
    const currentQuadratic = currentN * currentN;

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8"
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Runtime Complexity Simulation
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Watch how different algorithm complexities scale as input size increases
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentN(10)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 hover:bg-black/60 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Reset</span>
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 hover:bg-black/60 transition-colors"
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-4 h-4" />
                                <span className="text-sm">Pause</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                <span className="text-sm">Play</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-start">
                {/* Live Runtime Display */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70 mb-4">
                            Current Simulation
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-emerald-400 font-mono">O(log n)</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-emerald-400 font-mono">
                                        {currentLogn}
                                    </p>
                                    <p className="text-xs text-muted-foreground">operations</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-blue-400 font-mono">O(n)</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-blue-400 font-mono">
                                        {currentLinear}
                                    </p>
                                    <p className="text-xs text-muted-foreground">operations</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-cyan-400 font-mono">O(n log n)</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-cyan-400 font-mono">
                                        {currentNlogn.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">operations</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-red-400 font-mono">O(n²)</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-red-400 font-mono">
                                        {currentQuadratic.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">operations</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10">
                            <p className="text-xs text-muted-foreground mb-1">Input Size (n)</p>
                            <p className="text-2xl font-bold font-mono">{currentN}</p>
                        </div>
                    </div>
                </div>

                {/* Static Chart with Current N Marker */}
                <div className="space-y-4">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                        Runtime Growth Visualization
                    </p>
                    <ChartContainer
                        className="w-full h-[400px] rounded-2xl border border-white/10 bg-black/40 p-4"
                        config={{
                            logn: { label: "O(log n)", color: "hsl(142 76% 36%)" },
                            linear: { label: "O(n)", color: "hsl(217 91% 60%)" },
                            nlogn: { label: "O(n log n)", color: "hsl(188 94% 43%)" },
                            quadratic: { label: "O(n²)", color: "hsl(0 84% 60%)" },
                        }}
                    >
                        <LineChart
                            data={chartData}
                            margin={{ left: 16, right: 16, top: 12, bottom: 12 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="n"
                                type="number"
                                domain={[0, 1000]}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickCount={6}
                                tickFormatter={(value) => `${value}`}
                                stroke="rgba(255,255,255,0.5)"
                            />
                            <YAxis
                                type="number"
                                domain={[0, 1200]}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={4}
                                tickCount={7}
                                tickFormatter={(v) => `${Math.round(v)}`}
                                stroke="rgba(255,255,255,0.5)"
                            />
                            <ChartTooltip
                                cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(label) => `n = ${label}`}
                                        formatter={(value: number, name: string, item: any) => {
                                            const n = item?.payload?.n || 1;
                                            const labels: Record<string, string> = {
                                                logn: 'O(log n)',
                                                linear: 'O(n)',
                                                nlogn: 'O(n log n)',
                                                quadratic: 'O(n²)',
                                            };
                                            // Show actual values, not scaled
                                            let actualValue = value;
                                            if (name === 'logn') actualValue = Math.log2(n);
                                            if (name === 'nlogn') actualValue = n * Math.log2(n);
                                            if (name === 'quadratic') actualValue = n * n;
                                            return [Math.round(actualValue).toLocaleString(), labels[name] || name];
                                        }}
                                    />
                                }
                            />
                            {/* Vertical line showing current n */}
                            <CartesianGrid 
                                vertical={true} 
                                horizontal={false}
                                strokeDasharray="5 5"
                                stroke="rgba(255,255,255,0.3)"
                            />
                            <Line
                                type="monotone"
                                dataKey="logn"
                                stroke="hsl(142 76% 36%)"
                                strokeWidth={3}
                                dot={false}
                                isAnimationActive={false}
                            />
                            <Line
                                type="linear"
                                dataKey="linear"
                                stroke="hsl(217 91% 60%)"
                                strokeWidth={3}
                                dot={false}
                                isAnimationActive={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="nlogn"
                                stroke="hsl(188 94% 43%)"
                                strokeWidth={3}
                                dot={false}
                                isAnimationActive={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="quadratic"
                                stroke="hsl(0 84% 60%)"
                                strokeWidth={3}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </div>
            </div>
        </motion.section>
    );
};

// File System Visualization Component
interface FileNode {
    name: string;
    type: "file" | "directory";
    size?: number;
    children?: FileNode[];
    inode?: number;
    blocks?: number[];
    permissions?: string;
    createdAt?: string;
}

const BLOCK_SIZE = 512; // Typical block size in bytes

const createInitialFS = (): FileNode => ({
    name: "/",
    type: "directory",
    inode: 1,
    permissions: "drwxr-xr-x",
    createdAt: "2024-01-01 10:00:00",
    children: [
        {
            name: "home",
            type: "directory",
            inode: 2,
            permissions: "drwxr-xr-x",
            createdAt: "2024-01-01 10:05:00",
            children: [
                {
                    name: "user.txt",
                    type: "file",
                    size: 1024,
                    inode: 5,
                    blocks: [10, 11],
                    permissions: "-rw-r--r--",
                    createdAt: "2024-01-01 10:10:00",
                },
                {
                    name: "config",
                    type: "directory",
                    inode: 6,
                    permissions: "drwxr-xr-x",
                    createdAt: "2024-01-01 10:15:00",
                    children: [],
                },
            ],
        },
        {
            name: "etc",
            type: "directory",
            inode: 3,
            permissions: "drwxr-xr-x",
            createdAt: "2024-01-01 10:20:00",
            children: [
                {
                    name: "config.txt",
                    type: "file",
                    size: 512,
                    inode: 7,
                    blocks: [12],
                    permissions: "-rw-r--r--",
                    createdAt: "2024-01-01 10:25:00",
                },
            ],
        },
        {
            name: "readme.txt",
            type: "file",
            size: 2048,
            inode: 4,
            blocks: [13, 14, 15, 16],
            permissions: "-rw-r--r--",
            createdAt: "2024-01-01 10:30:00",
        },
    ],
});

const FileSystemSimulation = () => {
    const [viewMode, setViewMode] = useState<"tree" | "inode" | "operations" | "blocks">("tree");
    const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
    const [operationLog, setOperationLog] = useState<string[]>([]);
    const [fsState, setFsState] = useState<FileNode>(createInitialFS());
    const [nextInode, setNextInode] = useState(8);
    const [usedBlocks, setUsedBlocks] = useState<Set<number>>(new Set([10, 11, 12, 13, 14, 15, 16]));

    const addLog = (message: string) => {
        setOperationLog((prev) => [message, ...prev].slice(0, 15));
    };

    // Helper to find and update node in tree
    const updateNodeInTree = (
        tree: FileNode,
        targetPath: string[],
        updater: (node: FileNode) => FileNode
    ): FileNode => {
        if (targetPath.length === 0) return updater(tree);
        if (!tree.children) return tree;

        return {
            ...tree,
            children: tree.children.map((child) =>
                child.name === targetPath[0]
                    ? updateNodeInTree(child, targetPath.slice(1), updater)
                    : child
            ),
        };
    };

    const findFreeBlocks = (numBlocks: number): number[] => {
        const free: number[] = [];
        for (let i = 0; i < 64 && free.length < numBlocks; i++) {
            if (!usedBlocks.has(i)) {
                free.push(i);
            }
        }
        return free;
    };

    const renderTree = (node: FileNode, depth = 0): JSX.Element => {
        const isSelected = selectedNode === node;
        const indent = depth * 20;

        return (
            <div key={node.name} className="select-none">
                <div
                    className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors ${
                        isSelected
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : "hover:bg-white/5"
                    }`}
                    style={{ paddingLeft: `${indent + 8}px` }}
                    onClick={() => setSelectedNode(node)}
                >
                    {node.type === "directory" ? (
                        <span className="text-emerald-400">📁</span>
                    ) : (
                        <span className="text-blue-400">📄</span>
                    )}
                    <span className="font-mono text-sm">{node.name}</span>
                    {node.type === "file" && node.size && (
                        <span className="text-xs text-muted-foreground ml-auto">
                            {node.size} bytes
                        </span>
                    )}
                    {node.inode && (
                        <span className="text-xs text-muted-foreground">(inode: {node.inode})</span>
                    )}
                </div>
                {node.children &&
                    node.children.map((child) => (
                        <div key={child.name}>{renderTree(child, depth + 1)}</div>
                    ))}
            </div>
        );
    };

    // Real file system operations
    const createFile = (parentPath: string[], fileName: string, size: number) => {
        const numBlocks = Math.ceil(size / BLOCK_SIZE);
        const blocks = findFreeBlocks(numBlocks);
        
        if (blocks.length < numBlocks) {
            addLog(`[${new Date().toLocaleTimeString()}] ERROR: Not enough free blocks to create ${fileName}`);
            return;
        }

        const newFile: FileNode = {
            name: fileName,
            type: "file",
            size,
            inode: nextInode,
            blocks,
            permissions: "-rw-r--r--",
            createdAt: new Date().toLocaleString(),
        };

        setFsState((prev) => {
            const updated = updateNodeInTree(prev, parentPath, (node) => {
                if (node.type !== "directory") return node;
                const children = node.children || [];
                if (children.some((c) => c.name === fileName)) {
                    addLog(`[${new Date().toLocaleTimeString()}] ERROR: ${fileName} already exists`);
                    return node;
                }
                return {
                    ...node,
                    children: [...children, newFile],
                };
            });
            return updated;
        });

        setNextInode((prev) => prev + 1);
        setUsedBlocks((prev) => {
            const newSet = new Set(prev);
            blocks.forEach((b) => newSet.add(b));
            return newSet;
        });
        addLog(`[${new Date().toLocaleTimeString()}] CREATE: ${fileName} (${size} bytes, inode: ${newFile.inode}, blocks: ${blocks.join(", ")})`);
    };

    const deleteFile = (parentPath: string[], fileName: string) => {
        setFsState((prev) => {
            let deletedNode: FileNode | null = null;
            const updated = updateNodeInTree(prev, parentPath, (node) => {
                if (node.type !== "directory" || !node.children) return node;
                const fileToDelete = node.children.find((c) => c.name === fileName);
                if (fileToDelete) {
                    deletedNode = fileToDelete;
                    return {
                        ...node,
                        children: node.children.filter((c) => c.name !== fileName),
                    };
                }
                return node;
            });

            if (deletedNode && deletedNode.blocks) {
                setUsedBlocks((prev) => {
                    const newSet = new Set(prev);
                    deletedNode!.blocks!.forEach((b) => newSet.delete(b));
                    return newSet;
                });
                addLog(`[${new Date().toLocaleTimeString()}] DELETE: ${fileName} (freed blocks: ${deletedNode.blocks.join(", ")})`);
            } else {
                addLog(`[${new Date().toLocaleTimeString()}] ERROR: ${fileName} not found`);
            }

            if (selectedNode && deletedNode && selectedNode.name === fileName) {
                setSelectedNode(null);
            }

            return updated;
        });
    };

    const createDirectory = (parentPath: string[], dirName: string) => {
        const newDir: FileNode = {
            name: dirName,
            type: "directory",
            inode: nextInode,
            children: [],
            permissions: "drwxr-xr-x",
            createdAt: new Date().toLocaleString(),
        };

        setFsState((prev) => {
            const updated = updateNodeInTree(prev, parentPath, (node) => {
                if (node.type !== "directory") return node;
                const children = node.children || [];
                if (children.some((c) => c.name === dirName)) {
                    addLog(`[${new Date().toLocaleTimeString()}] ERROR: ${dirName} already exists`);
                    return node;
                }
                return {
                    ...node,
                    children: [...children, newDir],
                };
            });
            return updated;
        });

        setNextInode((prev) => prev + 1);
        addLog(`[${new Date().toLocaleTimeString()}] MKDIR: ${dirName}/ (inode: ${newDir.inode})`);
    };

    const writeFile = (parentPath: string[], fileName: string, bytesToWrite: number) => {
        setFsState((prev) => {
            let fileNode: FileNode | null = null;
            const updated = updateNodeInTree(prev, parentPath, (node) => {
                if (node.type !== "directory" || !node.children) return node;
                return {
                    ...node,
                    children: node.children.map((child) => {
                        if (child.name === fileName && child.type === "file") {
                            const newSize = (child.size || 0) + bytesToWrite;
                            const currentBlocks = child.blocks || [];
                            const neededBlocks = Math.ceil(newSize / BLOCK_SIZE);
                            const additionalBlocks = findFreeBlocks(neededBlocks - currentBlocks.length);
                            
                            if (additionalBlocks.length < neededBlocks - currentBlocks.length) {
                                addLog(`[${new Date().toLocaleTimeString()}] ERROR: Not enough free blocks to write to ${fileName}`);
                                return child;
                            }

                            const allBlocks = [...currentBlocks, ...additionalBlocks];
                            fileNode = {
                                ...child,
                                size: newSize,
                                blocks: allBlocks,
                            };

                            setUsedBlocks((prev) => {
                                const newSet = new Set(prev);
                                additionalBlocks.forEach((b) => newSet.add(b));
                                return newSet;
                            });

                            // Update selectedNode if this file is selected
                            if (selectedNode && selectedNode.name === fileName && selectedNode.inode === child.inode) {
                                setSelectedNode(fileNode);
                            }

                            addLog(`[${new Date().toLocaleTimeString()}] WRITE: ${fileName} (+${bytesToWrite} bytes, new size: ${newSize}, blocks: ${allBlocks.join(", ")})`);
                            return fileNode;
                        }
                        return child;
                    }),
                };
            });

            if (!fileNode) {
                addLog(`[${new Date().toLocaleTimeString()}] ERROR: ${fileName} not found`);
            }

            return updated;
        });
    };

    const readFile = (parentPath: string[], fileName: string) => {
        let found = false;
        const findFile = (node: FileNode, path: string[]): FileNode | null => {
            if (path.length === 0) return null;
            if (!node.children) return null;
            const child = node.children.find((c) => c.name === path[0]);
            if (!child) return null;
            if (path.length === 1 && child.name === fileName && child.type === "file") {
                found = true;
                return child;
            }
            return findFile(child, path.slice(1));
        };

        const file = findFile(fsState, parentPath);
        if (found && file) {
            addLog(`[${new Date().toLocaleTimeString()}] READ: ${fileName} (${file.size} bytes, inode: ${file.inode})`);
        } else {
            addLog(`[${new Date().toLocaleTimeString()}] ERROR: ${fileName} not found`);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8"
        >
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        File System Visualization
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Interactive file system structure and operations
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setFsState(createInitialFS());
                            setNextInode(8);
                            setUsedBlocks(new Set([10, 11, 12, 13, 14, 15, 16]));
                            setOperationLog([]);
                            setSelectedNode(null);
                            addLog(`[${new Date().toLocaleTimeString()}] RESET: File system restored to initial state`);
                        }}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 hover:bg-black/60 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Reset</span>
                    </button>
                    <div className="flex rounded-full border border-white/10 bg-black/40 p-1">
                        <button
                            onClick={() => setViewMode("tree")}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                viewMode === "tree"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "text-muted-foreground hover:text-white"
                            }`}
                        >
                            Tree
                        </button>
                        <button
                            onClick={() => setViewMode("inode")}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                viewMode === "inode"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "text-muted-foreground hover:text-white"
                            }`}
                        >
                            Inode
                        </button>
                        <button
                            onClick={() => setViewMode("operations")}
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                viewMode === "operations"
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : "text-muted-foreground hover:text-white"
                            }`}
                        >
                            Operations
                        </button>
                    </div>
                </div>
            </div>

            {viewMode === "tree" && (
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                            Directory Tree
                        </p>
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 max-h-[500px] overflow-y-auto">
                            {renderTree(fsState)}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                            Selected Node Info
                        </p>
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                            {selectedNode ? (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Name</p>
                                        <p className="font-mono font-bold text-lg">{selectedNode.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Type</p>
                                        <p className="font-mono">
                                            {selectedNode.type === "directory" ? "Directory" : "File"}
                                        </p>
                                    </div>
                                    {selectedNode.inode && (
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Inode Number</p>
                                            <p className="font-mono">{selectedNode.inode}</p>
                                        </div>
                                    )}
                                    {selectedNode.size && (
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">Size</p>
                                            <p className="font-mono">{selectedNode.size} bytes</p>
                                        </div>
                                    )}
                                    {selectedNode.children && (
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">
                                                Children
                                            </p>
                                            <p className="font-mono">{selectedNode.children.length} items</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Select a node to view details</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {viewMode === "inode" && (
                <div className="space-y-4">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                        Inode Structure
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {selectedNode && selectedNode.inode ? (
                                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                                    <p className="text-xs text-muted-foreground mb-2">Inode #{selectedNode.inode}</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Type:</span>
                                            <span className="font-mono">
                                                {selectedNode.type === "directory" ? "DIR" : "FILE"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Size:</span>
                                            <span className="font-mono">{selectedNode.size || 0} bytes</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Blocks:</span>
                                            <span className="font-mono">
                                                {selectedNode.blocks
                                                    ? `${selectedNode.blocks.length} (${selectedNode.blocks.join(", ")})`
                                                    : "0"}
                                            </span>
                                        </div>
                                        {selectedNode.blocks && selectedNode.blocks.length > 0 && (
                                            <div className="mt-3 pt-3 border-t border-white/10">
                                                <p className="text-xs text-muted-foreground mb-2">Block Allocation:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedNode.blocks.map((block) => (
                                                        <span
                                                            key={block}
                                                            className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono"
                                                        >
                                                            {block}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Links:</span>
                                            <span className="font-mono">1</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground col-span-full">
                                    Select a file or directory to view its inode structure
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {viewMode === "operations" && (
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                            File Operations
                        </p>
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                            <button
                                onClick={() => {
                                    const fileName = `newfile_${Date.now()}.txt`;
                                    createFile([], fileName, 1024);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <span className="text-emerald-400">+</span> Create File (1024 bytes)
                            </button>
                            <button
                                onClick={() => {
                                    const fileName = "readme.txt";
                                    readFile([], fileName);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <span className="text-blue-400">→</span> Read File (readme.txt)
                            </button>
                            <button
                                onClick={() => {
                                    const fileName = "user.txt";
                                    writeFile(["home"], fileName, 512);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <span className="text-cyan-400">✎</span> Write File (+512 bytes to user.txt)
                            </button>
                            <button
                                onClick={() => {
                                    const fileName = "config.txt";
                                    deleteFile(["etc"], fileName);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <span className="text-red-400">×</span> Delete File (config.txt)
                            </button>
                            <button
                                onClick={() => {
                                    const dirName = `newdir_${Date.now()}`;
                                    createDirectory([], dirName);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <span className="text-emerald-400">📁</span> Create Directory
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                            Operation Log
                        </p>
                        <div className="rounded-2xl border border-white/10 bg-black/40 p-4 max-h-[400px] overflow-y-auto">
                            <div className="space-y-2 font-mono text-sm">
                                {operationLog.length > 0 ? (
                                    operationLog.map((log, idx) => (
                                        <div key={idx} className="text-muted-foreground py-1 border-b border-white/5">
                                            {log}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No operations yet. Try an operation!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
};

// Process Scheduling Simulation Component (kept as secondary feature)
interface Process {
    id: string;
    name: string;
    arrivalTime: number;
    burstTime: number;
    color: string;
}

const SAMPLE_PROCESSES: Process[] = [
    { id: "P1", name: "Process 1", arrivalTime: 0, burstTime: 4, color: "hsl(142 76% 36%)" },
    { id: "P2", name: "Process 2", arrivalTime: 1, burstTime: 3, color: "hsl(217 91% 60%)" },
    { id: "P3", name: "Process 3", arrivalTime: 2, burstTime: 2, color: "hsl(188 94% 43%)" },
    { id: "P4", name: "Process 4", arrivalTime: 3, burstTime: 5, color: "hsl(0 84% 60%)" },
];

const ProcessSchedulingSimulation = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [strategy, setStrategy] = useState<
        "FCFS" | "SJF" | "SRTN" | "RR" | "HRRN" | "PRIONP" | "MLF" | "LCFSPR"
    >("FCFS");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Calculate schedule based on strategy
    const calculateSchedule = () => {
        const processes = [...SAMPLE_PROCESSES];
        const schedule: { processId: string; start: number; end: number; color: string }[] = [];
        let time = 0;

        // Sort based on scheduling strategy
        switch (strategy) {
            case "FCFS":
                // First Come First Serve - sort by arrival time
                processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
                break;
            case "SJF":
            case "PRIONP":
                // Shortest Job First / Priority Non-Preemptive - sort by burst time
                processes.sort((a, b) => a.burstTime - b.burstTime);
                break;
            case "SRTN":
                // Shortest Remaining Time Next - same as SJF for non-preemptive demo
                processes.sort((a, b) => a.burstTime - b.burstTime);
                break;
            case "HRRN":
                // Highest Response Ratio Next - sort by response ratio
                processes.sort((a, b) => {
                    const ratioA = (currentTime - a.arrivalTime + a.burstTime) / a.burstTime;
                    const ratioB = (currentTime - b.arrivalTime + b.burstTime) / b.burstTime;
                    return ratioB - ratioA;
                });
                break;
            case "RR":
            case "MLF":
            case "LCFSPR":
                // Round Robin / Multi-Level Feedback / Last Come First Served Preemptive
                // For demo, use FCFS order
                processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
                break;
        }

        for (const proc of processes) {
            const start = Math.max(time, proc.arrivalTime);
            const end = start + proc.burstTime;
            schedule.push({ processId: proc.id, start, end, color: proc.color });
            time = end;
        }

        return schedule;
    };

    const schedule = calculateSchedule();
    const totalTime = schedule.length > 0 ? schedule[schedule.length - 1].end : 14;

    // Animation
    useEffect(() => {
        if (!isPlaying) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setCurrentTime((prev) => {
                if (prev >= totalTime) return 0;
                return prev + 0.1;
            });
        }, 100);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, totalTime]);

    // Calculate metrics
    const calculateMetrics = () => {
        let totalWaiting = 0;
        let totalTurnaround = 0;

        for (const proc of SAMPLE_PROCESSES) {
            const scheduleEntry = schedule.find((s) => s.processId === proc.id);
            if (scheduleEntry) {
                const waitingTime = scheduleEntry.start - proc.arrivalTime;
                const turnaroundTime = scheduleEntry.end - proc.arrivalTime;
                totalWaiting += waitingTime;
                totalTurnaround += turnaroundTime;
            }
        }

        return {
            avgWaiting: (totalWaiting / SAMPLE_PROCESSES.length).toFixed(1),
            avgTurnaround: (totalTurnaround / SAMPLE_PROCESSES.length).toFixed(1),
        };
    };

    const metrics = calculateMetrics();

    // Find current running process
    const currentProcess = schedule.find(
        (s) => currentTime >= s.start && currentTime < s.end
    );

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-6 md:p-8"
        >
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Process Scheduling Simulation
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Visualizing CPU scheduling algorithms in action
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-black/40 p-1">
                        {(["FCFS", "SJF", "SRTN", "RR", "HRRN", "PRIONP", "MLF", "LCFSPR"] as const).map(
                            (alg) => (
                                <button
                                    key={alg}
                                    onClick={() => {
                                        setStrategy(alg);
                                        setCurrentTime(0);
                                    }}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                        strategy === alg
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "text-muted-foreground hover:text-white"
                                    }`}
                                    title={
                                        alg === "FCFS"
                                            ? "First Come First Served"
                                            : alg === "SJF"
                                            ? "Shortest Job First"
                                            : alg === "SRTN"
                                            ? "Shortest Remaining Time Next"
                                            : alg === "RR"
                                            ? "Round Robin"
                                            : alg === "HRRN"
                                            ? "Highest Response Ratio Next"
                                            : alg === "PRIONP"
                                            ? "Priority Non-Preemptive"
                                            : alg === "MLF"
                                            ? "Multi-Level Feedback"
                                            : "Last Come First Served Preemptive"
                                    }
                                >
                                    {alg}
                                </button>
                            )
                        )}
                    </div>
                    <button
                        onClick={() => setCurrentTime(0)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 hover:bg-black/60 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Reset</span>
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 hover:bg-black/60 transition-colors"
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-4 h-4" />
                                <span className="text-sm">Pause</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4" />
                                <span className="text-sm">Play</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Process Table */}
                <div className="lg:col-span-1 space-y-4">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                        Process Queue
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                        {SAMPLE_PROCESSES.map((proc) => {
                            const isRunning = currentProcess?.processId === proc.id;
                            const scheduleEntry = schedule.find((s) => s.processId === proc.id);
                            const isCompleted = scheduleEntry && currentTime >= scheduleEntry.end;

                            return (
                                <div
                                    key={proc.id}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-300 ${
                                        isRunning
                                            ? "border-2 scale-[1.02]"
                                            : isCompleted
                                            ? "opacity-50 border border-white/5"
                                            : "border border-white/10"
                                    }`}
                                    style={{
                                        borderColor: isRunning ? proc.color : undefined,
                                        backgroundColor: isRunning ? `${proc.color}15` : "transparent",
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: proc.color }}
                                        />
                                        <span className="font-mono text-sm font-medium">{proc.id}</span>
                                    </div>
                                    <div className="text-right text-xs text-muted-foreground">
                                        <div>Arrival: {proc.arrivalTime}</div>
                                        <div>Burst: {proc.burstTime}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Metrics */}
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
                        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                            Metrics
                        </p>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Avg Waiting Time</span>
                            <span className="font-mono font-bold">{metrics.avgWaiting}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Avg Turnaround</span>
                            <span className="font-mono font-bold">{metrics.avgTurnaround}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Current Time</span>
                            <span className="font-mono font-bold">{Math.floor(currentTime)}</span>
                        </div>
                    </div>
                </div>

                {/* Gantt Chart */}
                <div className="lg:col-span-2 space-y-4">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground/70">
                        Gantt Chart
                    </p>
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        {/* Gantt bars */}
                        <div className="relative h-16 mb-4">
                            {schedule.map((entry, idx) => {
                                const left = (entry.start / totalTime) * 100;
                                const width = ((entry.end - entry.start) / totalTime) * 100;
                                const isActive = currentTime >= entry.start && currentTime < entry.end;
                                const isCompleted = currentTime >= entry.end;

                                return (
                                    <div
                                        key={idx}
                                        className={`absolute top-0 h-full rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                                            isActive ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""
                                        }`}
                                        style={{
                                            left: `${left}%`,
                                            width: `${width}%`,
                                            backgroundColor: entry.color,
                                            opacity: isCompleted ? 1 : isActive ? 1 : 0.4,
                                        }}
                                    >
                                        {entry.processId}
                                    </div>
                                );
                            })}
                            {/* Current time indicator */}
                            <div
                                className="absolute top-0 w-0.5 h-full bg-white transition-all duration-100"
                                style={{ left: `${(currentTime / totalTime) * 100}%` }}
                            />
                        </div>

                        {/* Time axis */}
                        <div className="relative h-6 border-t border-white/10">
                            {Array.from({ length: Math.ceil(totalTime) + 1 }, (_, i) => (
                                <div
                                    key={i}
                                    className="absolute text-xs text-muted-foreground font-mono"
                                    style={{ left: `${(i / totalTime) * 100}%`, transform: "translateX(-50%)" }}
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current Status */}
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Currently Running</p>
                                <p className="text-xl font-bold font-mono">
                                    {currentProcess ? (
                                        <span style={{ color: currentProcess.color }}>
                                            {currentProcess.processId}
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground">Idle</span>
                                    )}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground mb-1">Strategy</p>
                                <p className="text-lg font-bold font-mono text-emerald-400">
                                    {strategy === "FCFS"
                                        ? "First Come First Served"
                                        : strategy === "SJF"
                                        ? "Shortest Job First"
                                        : strategy === "SRTN"
                                        ? "Shortest Remaining Time Next"
                                        : strategy === "RR"
                                        ? "Round Robin"
                                        : strategy === "HRRN"
                                        ? "Highest Response Ratio Next"
                                        : strategy === "PRIONP"
                                        ? "Priority Non-Preemptive"
                                        : strategy === "MLF"
                                        ? "Multi-Level Feedback"
                                        : "Last Come First Served Preemptive"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const ProjectDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Ensure we always start at the top when opening a project detail
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, []);

    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="text-emerald-500 hover:underline"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <CustomCursor />
            <Navbar />
            <div className="min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate("/#projects")}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Projects
                        </motion.button>

                        {/* Project Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-emerald-500 text-sm font-medium uppercase tracking-wider">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold mt-2 mb-4">
                                {project.title}
                            </h1>
                            {project.award && (
                                <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-sm mb-6">
                                    🏆 {project.award}
                                </div>
                            )}
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-2 mb-8"
                        >
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-invert max-w-none mb-8"
                        >
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex gap-4 mb-12"
                        >
                            {project.link && project.link !== "#" && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-full hover:shadow-lg transition-all"
                                >
                                    <Github className="w-4 h-4" />
                                    View on GitHub
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 glass border border-white/10 font-semibold rounded-full hover:bg-white/5 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                        </motion.div>

                        {/* Detailed Content Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-12"
                        >
                            {project.content?.overview && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {project.content.overview}
                                    </p>
                                </div>
                            )}

                            {/* Algorithms & runtimes visualisation for ETH Algorithms project */}
                            {project.slug === "eth-algorithms" && <RuntimeSimulation />}

                            {/* File System visualisation for System Programming project */}
                            {project.slug === "system-programming" && (
                                <>
                                    <FileSystemSimulation />
                                    <div className="mt-8">
                                        <ProcessSchedulingSimulation />
                                    </div>
                                </>
                            )}

                            {project.content && (
                                <>
                                    {project.content.challenges && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Challenges</h2>
                                            <ul className="space-y-2 text-muted-foreground">
                                                {project.content.challenges.map((challenge, idx) => (
                                                    <li key={idx} className="flex gap-3">
                                                        <span className="text-emerald-500 mt-1">→</span>
                                                        <span>{challenge}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {project.content.solutions && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Solutions</h2>
                                            <ul className="space-y-2 text-muted-foreground">
                                                {project.content.solutions.map((solution, idx) => (
                                                    <li key={idx} className="flex gap-3">
                                                        <span className="text-emerald-500 mt-1">✓</span>
                                                        <span>{solution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {project.content.results && (
                                        <div>
                                            <h2 className="text-2xl font-bold mb-4">Results</h2>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {project.content.results}
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetail;
