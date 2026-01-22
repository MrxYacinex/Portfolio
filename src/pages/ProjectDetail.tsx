import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Play, Pause, RotateCcw, Code2, Zap, Network, Layers, X, Copy, Check } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-java";
import RuntimeSimulation from "@/components/RuntimeSimulation";
import { projectsData } from "@/data/projects";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";



// Algorithm data with code examples
interface AlgorithmData {
    name: string;
    complexity: string;
    description: string;
    code: string;
    visualizationType?: "sorting" | "graph" | "search" | "tree" | "array" | "none";
}

const algorithmDataMap: Record<string, AlgorithmData> = {
    "Binary Search": {
        name: "Binary Search",
        complexity: "O(log n)",
        description: "Divide & Conquer on sorted arrays",
        code: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        visualizationType: "search"
    },
    "Merge Sort": {
        name: "Merge Sort",
        complexity: "O(n log n)",
        description: "Stable Divide & Conquer",
        code: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    System.arraycopy(temp, 0, arr, left, temp.length);
}`,
        visualizationType: "sorting"
    },
    "Quick Sort": {
        name: "Quick Sort",
        complexity: "O(n log n)",
        description: "Divide & Conquer with random pivot",
        code: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}`,
        visualizationType: "sorting"
    },
    "BFS": {
        name: "BFS",
        complexity: "O(V + E)",
        description: "Breadth-First Search traversal",
        code: `public void bfs(int start, List<List<Integer>> graph) {
    Queue<Integer> queue = new LinkedList<>();
    boolean[] visited = new boolean[graph.size()];
    queue.offer(start);
    visited[start] = true;
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}`,
        visualizationType: "graph"
    },
    "DFS": {
        name: "DFS",
        complexity: "O(V + E)",
        description: "Depth-First Search traversal",
        code: `public void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}`,
        visualizationType: "graph"
    },
    "Dijkstra": {
        name: "Dijkstra",
        complexity: "O(E log V)",
        description: "Shortest path with non-negative weights",
        code: `public int[] dijkstra(int start, List<List<int[]>> graph, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.offer(new int[]{start, 0});
    
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int u = curr[0], d = curr[1];
        if (d > dist[u]) continue;
        
        for (int[] edge : graph.get(u)) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{v, dist[v]});
            }
        }
    }
    return dist;
}`,
        visualizationType: "graph"
    },
    "Fibonacci": {
        name: "Fibonacci",
        complexity: "O(n)",
        description: "Memoization / Tabulation",
        code: `public int fibonacci(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
        visualizationType: "array"
    },
    "Linear Search": {
        name: "Linear Search",
        complexity: "O(n)",
        description: "Simple iteration through elements",
        code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
        visualizationType: "search"
    },
    "Binary Search Tree": {
        name: "Binary Search Tree",
        complexity: "O(log n)",
        description: "Search, Insert, Delete operations",
        code: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public TreeNode search(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    return val < root.val ? search(root.left, val) : search(root.right, val);
}

public TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;
}`,
        visualizationType: "tree"
    },
    // Additional algorithms from repository
    "QuickSelect": {
        name: "QuickSelect",
        complexity: "O(n)",
        description: "Find k-th smallest element",
        code: `public static int quickSelect(int[] arr, int k) {
    return quickSelect(arr, 0, arr.length - 1, k - 1);
}

private static int quickSelect(int[] arr, int left, int right, int k) {
    if (left == right) return arr[left];
    int pivotIndex = partition(arr, left, right);
    if (k == pivotIndex) return arr[k];
    else if (k < pivotIndex) return quickSelect(arr, left, pivotIndex - 1, k);
    else return quickSelect(arr, pivotIndex + 1, right, k);
}`,
        visualizationType: "search"
    },
    "Heap Sort": {
        name: "Heap Sort",
        complexity: "O(n log n)",
        description: "Uses Binary Heap structure",
        code: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, n, largest);
    }
}`,
        visualizationType: "sorting"
    },
    "Bellman-Ford": {
        name: "Bellman-Ford",
        complexity: "O(V·E)",
        description: "Handles negative weights",
        code: `public int[] bellmanFord(int n, int[][] edges, int start) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    
    for (int i = 0; i < n - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    return dist;
}`,
        visualizationType: "graph"
    },
    "Floyd-Warshall": {
        name: "Floyd-Warshall",
        complexity: "O(V³)",
        description: "All-pairs shortest paths",
        code: `public int[][] floydWarshall(int n, int[][] graph) {
    int[][] dist = new int[n][n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            dist[i][j] = (i == j) ? 0 : graph[i][j];
        }
    }
    
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != Integer.MAX_VALUE && 
                    dist[k][j] != Integer.MAX_VALUE) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    return dist;
}`,
        visualizationType: "graph"
    },
    "LCS": {
        name: "LCS",
        complexity: "O(m·n)",
        description: "Longest Common Subsequence",
        code: `public int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`,
        visualizationType: "array"
    },
    "Edit Distance": {
        name: "Edit Distance",
        complexity: "O(m·n)",
        description: "Levenshtein Distance",
        code: `public int editDistance(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // delete
                    Math.min(dp[i][j - 1], dp[i - 1][j - 1]) // insert, replace
                );
            }
        }
    }
    return dp[m][n];
}`,
        visualizationType: "array"
    },
    "Knapsack (0/1)": {
        name: "Knapsack (0/1)",
        complexity: "O(n·W)",
        description: "Maximize value with weight limit",
        code: `public int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[][] dp = new int[n + 1][W + 1];
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    return dp[n][W];
}`,
        visualizationType: "array"
    },
    "Min-Heap (PQ)": {
        name: "Min-Heap (PQ)",
        complexity: "O(log n)",
        description: "Priority Queue implementation",
        code: `class MinHeap {
    private int[] heap;
    private int size;
    
    public void insert(int val) {
        heap[++size] = val;
        heapifyUp(size);
    }
    
    public int extractMin() {
        int min = heap[1];
        heap[1] = heap[size--];
        heapifyDown(1);
        return min;
    }
    
    private void heapifyUp(int i) {
        while (i > 1 && heap[i] < heap[i / 2]) {
            swap(i, i / 2);
            i /= 2;
        }
    }
    
    private void heapifyDown(int i) {
        while (2 * i <= size) {
            int min = i;
            if (heap[2 * i] < heap[min]) min = 2 * i;
            if (2 * i + 1 <= size && heap[2 * i + 1] < heap[min]) 
                min = 2 * i + 1;
            if (min == i) break;
            swap(i, min);
            i = min;
        }
    }
}`,
        visualizationType: "tree"
    },
    // Basics & Arithmetic
    "Karatsuba": {
        name: "Karatsuba",
        complexity: "O(n^1.585)",
        description: "Fast multiplication for large numbers",
        code: `public static long karatsuba(long x, long y) {
    if (x < 10 || y < 10) return x * y;
    
    int n = Math.max(String.valueOf(x).length(), String.valueOf(y).length());
    int m = n / 2;
    
    long power = (long) Math.pow(10, m);
    long a = x / power;
    long b = x % power;
    long c = y / power;
    long d = y % power;
    
    long z0 = karatsuba(a, c);
    long z1 = karatsuba((a + b), (c + d));
    long z2 = karatsuba(b, d);
    
    return z0 * power * power + (z1 - z0 - z2) * power + z2;
}`,
        visualizationType: "none"
    },
    "Celebrity Problem": {
        name: "Celebrity Problem",
        complexity: "O(n)",
        description: "Finding a person known by everyone but knowing no one",
        code: `public int findCelebrity(int n) {
    int candidate = 0;
    for (int i = 1; i < n; i++) {
        if (knows(candidate, i)) {
            candidate = i;
        }
    }
    
    for (int i = 0; i < n; i++) {
        if (i != candidate && (knows(candidate, i) || !knows(i, candidate))) {
            return -1;
        }
    }
    return candidate;
}`,
        visualizationType: "none"
    },
    "Pasture Break": {
        name: "Pasture Break",
        complexity: "O(d)",
        description: "Nearsighted Cow search",
        code: `public int pastureBreak(int d) {
    int count = 0;
    for (int x = 0; x <= d; x++) {
        for (int y = 0; y <= d; y++) {
            if (x * x + y * y <= d * d) {
                count++;
            }
        }
    }
    return count;
}`,
        visualizationType: "none"
    },
    // Search & Selection
    "Median of Medians": {
        name: "Median of Medians",
        complexity: "O(n)",
        description: "Deterministic pivot selection",
        code: `public static int medianOfMedians(int[] arr, int k) {
    if (arr.length <= 5) {
        Arrays.sort(arr);
        return arr[k];
    }
    
    int[] medians = new int[(arr.length + 4) / 5];
    for (int i = 0; i < medians.length; i++) {
        int start = i * 5;
        int end = Math.min(start + 5, arr.length);
        Arrays.sort(arr, start, end);
        medians[i] = arr[start + (end - start) / 2];
    }
    
    int pivot = medianOfMedians(medians, medians.length / 2);
    return quickSelect(arr, k, pivot);
}`,
        visualizationType: "search"
    },
    // Sorting Algorithms
    "Bubble Sort": {
        name: "Bubble Sort",
        complexity: "O(n²)",
        description: "Simple swapping of adjacent elements",
        code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
}`,
        visualizationType: "sorting"
    },
    "Insertion Sort": {
        name: "Insertion Sort",
        complexity: "O(n²)",
        description: "Efficient for small/nearly sorted data",
        code: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        visualizationType: "sorting"
    },
    "Selection Sort": {
        name: "Selection Sort",
        complexity: "O(n²)",
        description: "Selects minimum element repeatedly",
        code: `public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr, i, minIdx);
    }
}`,
        visualizationType: "sorting"
    },
    "Bucket Sort": {
        name: "Bucket Sort",
        complexity: "O(n+k)",
        description: "Distributes elements into buckets",
        code: `public static void bucketSort(int[] arr, int k) {
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < k; i++) buckets.add(new ArrayList<>());
    
    int max = Arrays.stream(arr).max().orElse(0);
    for (int num : arr) {
        int bucketIdx = (num * k) / (max + 1);
        buckets.get(bucketIdx).add(num);
    }
    
    for (List<Integer> bucket : buckets) {
        Collections.sort(bucket);
    }
    
    int idx = 0;
    for (List<Integer> bucket : buckets) {
        for (int num : bucket) {
            arr[idx++] = num;
        }
    }
}`,
        visualizationType: "sorting"
    },
    // Graph Algorithms
    "Euler Tour": {
        name: "Euler Tour",
        complexity: "O(E)",
        description: "Visits every edge exactly once",
        code: `public void eulerTour(int u, List<List<Integer>> graph, List<Integer> path) {
    while (!graph.get(u).isEmpty()) {
        int v = graph.get(u).remove(0);
        graph.get(v).remove(Integer.valueOf(u));
        eulerTour(v, graph, path);
    }
    path.add(u);
}`,
        visualizationType: "graph"
    },
    // Dynamic Programming
    "LIS": {
        name: "LIS",
        complexity: "O(n²)",
        description: "Longest Increasing Subsequence",
        code: `public int lis(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Arrays.stream(dp).max().orElse(0);
}`,
        visualizationType: "array"
    },
    "Max Subarray": {
        name: "Max Subarray",
        complexity: "O(n)",
        description: "Maximum sum contiguous subarray (Kadane's)",
        code: `public int maxSubarray(int[] nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}`,
        visualizationType: "array"
    },
    "Subset Sum": {
        name: "Subset Sum",
        complexity: "O(n·S)",
        description: "Subset summing to target S",
        code: `public boolean subsetSum(int[] nums, int target) {
    boolean[][] dp = new boolean[nums.length + 1][target + 1];
    for (int i = 0; i <= nums.length; i++) dp[i][0] = true;
    
    for (int i = 1; i <= nums.length; i++) {
        for (int j = 1; j <= target; j++) {
            if (nums[i - 1] > j) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
            }
        }
    }
    return dp[nums.length][target];
}`,
        visualizationType: "array"
    },
    "Matrix Chain": {
        name: "Matrix Chain",
        complexity: "O(n³)",
        description: "Optimal matrix multiplication order",
        code: `public int matrixChainOrder(int[] p) {
    int n = p.length - 1;
    int[][] dp = new int[n + 1][n + 1];
    
    for (int len = 2; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            dp[i][j] = Integer.MAX_VALUE;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k + 1][j] + p[i - 1] * p[k] * p[j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n];
}`,
        visualizationType: "array"
    },
    "Jump Game": {
        name: "Jump Game",
        complexity: "O(n)",
        description: "Minimum jumps to reach end",
        code: `public int jump(int[] nums) {
    int jumps = 0, farthest = 0, end = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == end) {
            jumps++;
            end = farthest;
        }
    }
    return jumps;
}`,
        visualizationType: "array"
    },
    // Data Structures
    "Union Find": {
        name: "Union Find",
        complexity: "O(α(n))",
        description: "Path Compression & Union by Rank",
        code: `class UnionFind {
    private int[] parent, rank;
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    public void union(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return;
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
}`,
        visualizationType: "tree"
    },
    "2-3 Tree": {
        name: "2-3 Tree",
        complexity: "O(log n)",
        description: "Balanced Tree Structure",
        code: `class Node23 {
    int[] keys = new int[2];
    Node23[] children = new Node23[3];
    int keyCount = 0;
    boolean isLeaf;
}

public Node23 search(Node23 root, int key) {
    if (root == null) return null;
    int i = 0;
    while (i < root.keyCount && key > root.keys[i]) i++;
    if (i < root.keyCount && key == root.keys[i]) return root;
    if (root.isLeaf) return null;
    return search(root.children[i], key);
}`,
        visualizationType: "tree"
    },
    "Stack": {
        name: "Stack",
        complexity: "O(1)",
        description: "LIFO (Last In First Out)",
        code: `class Stack {
    private int[] arr;
    private int top;
    
    public Stack(int size) {
        arr = new int[size];
        top = -1;
    }
    
    public void push(int x) {
        if (top == arr.length - 1) throw new StackOverflowError();
        arr[++top] = x;
    }
    
    public int pop() {
        if (top == -1) throw new EmptyStackException();
        return arr[top--];
    }
    
    public int peek() {
        if (top == -1) throw new EmptyStackException();
        return arr[top];
    }
}`,
        visualizationType: "array"
    },
    "Queue": {
        name: "Queue",
        complexity: "O(1)",
        description: "FIFO (First In First Out)",
        code: `class Queue {
    private int[] arr;
    private int front, rear, size;
    
    public Queue(int capacity) {
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    public void enqueue(int x) {
        if (size == arr.length) throw new IllegalStateException();
        rear = (rear + 1) % arr.length;
        arr[rear] = x;
        size++;
    }
    
    public int dequeue() {
        if (size == 0) throw new IllegalStateException();
        int x = arr[front];
        front = (front + 1) % arr.length;
        size--;
        return x;
    }
}`,
        visualizationType: "array"
    }
};

// Algorithm Modal Component - Complete Rework
interface AlgorithmModalProps {
    algorithm: AlgorithmData | null;
    isOpen: boolean;
    onClose: () => void;
}

const AlgorithmModal = ({ algorithm, isOpen, onClose }: AlgorithmModalProps) => {
    const [copied, setCopied] = useState(false);
    const [array, setArray] = useState<number[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (algorithm?.visualizationType === "sorting" || algorithm?.visualizationType === "search") {
            setArray([64, 34, 25, 12, 22, 11, 90, 5]);
            setCurrentStep(0);
        }
    }, [algorithm]);

    // State to store highlighted code HTML
    const [highlightedCode, setHighlightedCode] = useState<string>("");

    // Apply syntax highlighting when algorithm changes
    useEffect(() => {
        if (algorithm?.code && isOpen) {
            try {
                // Use Prism.highlight to highlight the code string directly
                const highlighted = Prism.highlight(algorithm.code, Prism.languages.java, 'java');
                setHighlightedCode(highlighted);
            } catch (error) {
                console.error('Prism highlighting error:', error);
                setHighlightedCode(algorithm.code);
            }
        } else {
            setHighlightedCode("");
        }
    }, [algorithm, isOpen]);

    // Handle ESC key and prevent body scroll when modal opens
    useEffect(() => {
        if (isOpen) {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    onClose();
                }
            };
            
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when modal is open
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            
            return () => {
                document.removeEventListener("keydown", handleEscape);
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen, onClose]);

    const handleCopy = () => {
        if (algorithm?.code) {
            navigator.clipboard.writeText(algorithm.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const renderVisualization = () => {
        if (!algorithm?.visualizationType) return null;

        switch (algorithm.visualizationType) {
            case "sorting":
            case "search":
                return (
                    <div className="space-y-4">
                        <div className="flex items-end gap-2 h-32 justify-center">
                            {array.map((value, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-emerald-500/80 rounded-t text-xs text-background font-mono px-2 flex items-end justify-center min-w-[40px]"
                                    style={{ height: `${(value / 100) * 120}px` }}
                                    animate={{
                                        backgroundColor: currentStep === idx ? "rgba(16, 185, 129, 1)" : "rgba(16, 185, 129, 0.5)",
                                        scale: currentStep === idx ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {value}
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-center">
                            <motion.button
                                onClick={() => {
                                    setIsAnimating(true);
                                    let step = 0;
                                    const interval = setInterval(() => {
                                        setCurrentStep(step);
                                        step++;
                                        if (step >= array.length) {
                                            clearInterval(interval);
                                            setIsAnimating(false);
                                            setCurrentStep(0);
                                        }
                                    }, 500);
                                }}
                                disabled={isAnimating}
                                className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors cursor-hover disabled:opacity-50"
                            >
                                {isAnimating ? "Animating..." : "Animate"}
                            </motion.button>
                        </div>
                    </div>
                );
            case "graph":
                return (
                    <div className="flex items-center justify-center h-32">
                        <div className="text-muted-foreground/60 text-sm">
                            Graph visualization coming soon
                        </div>
                    </div>
                );
            case "tree":
                return (
                    <div className="flex items-center justify-center h-32">
                        <div className="text-muted-foreground/60 text-sm">
                            Tree visualization coming soon
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isOpen || !algorithm) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                pointerEvents: 'auto'
            }}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                style={{ position: 'absolute', pointerEvents: 'auto' }}
            />
            
            {/* Modal Container - Centered */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl max-h-[90vh] glass rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                style={{
                    position: 'relative',
                    zIndex: 10000
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 border-b border-white/10 bg-background/90 backdrop-blur-sm shrink-0">
                    <div className="flex-1">
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                            <span className="text-gradient">{algorithm.name}</span>
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-mono text-emerald-400">{algorithm.complexity}</span>
                            <span>•</span>
                            <span>{algorithm.description}</span>
                        </div>
                    </div>
                    <motion.button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground shrink-0 ml-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* Content - Scrollable */}
                <div className="overflow-y-auto flex-1 p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Code Section */}
                        <div className="glass rounded-xl border border-white/10 p-4 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4 shrink-0">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                                    Code
                                </h3>
                                <motion.button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1.5 text-xs bg-background/60 hover:bg-background/80 rounded-lg transition-colors cursor-hover"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            Copy
                                        </>
                                    )}
                                </motion.button>
                            </div>
                            <div className="relative overflow-hidden rounded-lg border border-white/5 bg-[#1e1e1e] flex-1 min-h-0">
                                <pre 
                                    className="language-java text-xs md:text-sm p-4 m-0 h-full overflow-x-auto overflow-y-auto"
                                    style={{
                                        wordBreak: "normal",
                                        whiteSpace: "pre",
                                        tabSize: 4,
                                        overflowWrap: "normal",
                                        backgroundColor: "#1e1e1e",
                                        fontFamily: "'Courier New', Consolas, Monaco, monospace"
                                    }}
                                >
                                    <code 
                                        ref={codeRef} 
                                        className="language-java"
                                        dangerouslySetInnerHTML={{ __html: highlightedCode || algorithm?.code || "" }}
                                    />
                                </pre>
                            </div>
                        </div>

                        {/* Visualization Section */}
                        <div className="glass rounded-xl border border-white/10 p-4">
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                                Visualization
                            </h3>
                            {renderVisualization()}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    // Use portal only if document.body exists
    if (typeof document !== 'undefined' && document.body) {
        return createPortal(modalContent, document.body);
    }
    
    // Fallback: render normally if portal not available
    return modalContent;
};

// Algorithms Overview Component for ETH Algorithms project
const AlgorithmsOverview = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const algorithmCategories = [
        {
            name: "Basics & Arithmetic",
            icon: Code2,
            color: "emerald",
            algorithms: [
                { name: "Karatsuba", complexity: "O(n^1.585)", description: "Fast multiplication for large numbers" },
                { name: "Celebrity Problem", complexity: "O(n)", description: "Finding a person known by everyone" },
                { name: "Pasture Break", complexity: "O(d)", description: "Nearsighted Cow search" },
            ]
        },
        {
            name: "Search & Selection",
            icon: Zap,
            color: "blue",
            algorithms: [
                { name: "Linear Search", complexity: "O(n)", description: "Simple iteration through elements" },
                { name: "Binary Search", complexity: "O(log n)", description: "Divide & Conquer on sorted arrays" },
                { name: "QuickSelect", complexity: "O(n)", description: "Find k-th smallest element" },
                { name: "Median of Medians", complexity: "O(n)", description: "Deterministic pivot selection" },
            ]
        },
        {
            name: "Sorting",
            icon: Layers,
            color: "cyan",
            algorithms: [
                { name: "Bubble Sort", complexity: "O(n²)", description: "Simple swapping of adjacent elements" },
                { name: "Insertion Sort", complexity: "O(n²)", description: "Efficient for small/nearly sorted data" },
                { name: "Selection Sort", complexity: "O(n²)", description: "Selects minimum element repeatedly" },
                { name: "Merge Sort", complexity: "O(n log n)", description: "Stable Divide & Conquer" },
                { name: "Quick Sort", complexity: "O(n log n)", description: "Divide & Conquer with random pivot" },
                { name: "Heap Sort", complexity: "O(n log n)", description: "Uses Binary Heap structure" },
                { name: "Bucket Sort", complexity: "O(n+k)", description: "Distributes elements into buckets" },
            ]
        },
        {
            name: "Graph Algorithms",
            icon: Network,
            color: "amber",
            algorithms: [
                { name: "BFS", complexity: "O(V + E)", description: "Breadth-First Search traversal" },
                { name: "DFS", complexity: "O(V + E)", description: "Depth-First Search traversal" },
                { name: "Dijkstra", complexity: "O(E log V)", description: "Shortest path with non-negative weights" },
                { name: "Bellman-Ford", complexity: "O(V·E)", description: "Handles negative weights" },
                { name: "Floyd-Warshall", complexity: "O(V³)", description: "All-pairs shortest paths" },
                { name: "Euler Tour", complexity: "O(E)", description: "Visits every edge exactly once" },
            ]
        },
        {
            name: "Dynamic Programming",
            icon: Code2,
            color: "purple",
            algorithms: [
                { name: "Fibonacci", complexity: "O(n)", description: "Memoization / Tabulation" },
                { name: "Max Subarray", complexity: "O(n)", description: "Maximum sum contiguous subarray" },
                { name: "LCS", complexity: "O(m·n)", description: "Longest Common Subsequence" },
                { name: "Edit Distance", complexity: "O(m·n)", description: "Levenshtein Distance" },
                { name: "Knapsack (0/1)", complexity: "O(n·W)", description: "Maximize value with weight limit" },
                { name: "LIS", complexity: "O(n²)", description: "Longest Increasing Subsequence" },
                { name: "Subset Sum", complexity: "O(n·S)", description: "Subset summing to target S" },
                { name: "Matrix Chain", complexity: "O(n³)", description: "Optimal matrix multiplication order" },
                { name: "Jump Game", complexity: "O(n)", description: "Minimum jumps to reach end" },
            ]
        },
        {
            name: "Data Structures",
            icon: Layers,
            color: "emerald",
            algorithms: [
                { name: "Stack", complexity: "O(1)", description: "LIFO (Last In First Out)" },
                { name: "Queue", complexity: "O(1)", description: "FIFO (First In First Out)" },
                { name: "Binary Search Tree", complexity: "O(log n)", description: "Search, Insert, Delete operations" },
                { name: "Min-Heap (PQ)", complexity: "O(log n)", description: "Priority Queue implementation" },
                { name: "Union Find", complexity: "O(α(n))", description: "Path Compression & Union by Rank" },
                { name: "2-3 Tree", complexity: "O(log n)", description: "Balanced Tree Structure" },
            ]
        },
    ];

    const colorMap: Record<string, string> = {
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-8 md:p-10"
        >
            <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                    <span className="text-gradient">Algorithm Categories</span>
                </h2>
                <p className="text-muted-foreground/70 text-sm md:text-base">
                    Comprehensive collection of algorithms and data structures organized by category
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {algorithmCategories.map((category, idx) => {
                    const Icon = category.icon;
                    return (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all cursor-hover"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg border ${colorMap[category.color]}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-display text-xl font-bold">{category.name}</h3>
                            </div>
                            
                            <div className="space-y-3">
                                {category.algorithms.map((alg, algIdx) => {
                                    const algorithmData = algorithmDataMap[alg.name];
                                    const hasDetails = !!algorithmData;
                                    return (
                                        <motion.div
                                            key={algIdx}
                                            onClick={() => {
                                                if (hasDetails) {
                                                    setSelectedAlgorithm(algorithmData);
                                                    setIsModalOpen(true);
                                                }
                                            }}
                                            className={`p-3 rounded-lg border border-white/5 bg-background/40 transition-all ${
                                                hasDetails 
                                                    ? "hover:bg-background/60 hover:border-white/10 cursor-hover" 
                                                    : "opacity-60"
                                            }`}
                                            whileHover={hasDetails ? { scale: 1.02 } : {}}
                                            whileTap={hasDetails ? { scale: 0.98 } : {}}
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <span className="font-mono font-semibold text-sm text-foreground/90">
                                                    {alg.name}
                                                </span>
                                                <span className="font-mono text-xs text-emerald-400/80 whitespace-nowrap">
                                                    {alg.complexity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground/70 leading-relaxed">
                                                {alg.description}
                                            </p>
                                            {hasDetails && (
                                                <p className="text-xs text-emerald-400/60 mt-2">
                                                    Click to view code & visualization →
                                                </p>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Repository Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12 glass rounded-xl border border-white/10 p-6"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="font-display text-3xl font-bold text-foreground mb-1">50+</div>
                        <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Algorithms</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-3xl font-bold text-foreground mb-1">6</div>
                        <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Categories</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-3xl font-bold text-foreground mb-1">Java</div>
                        <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Language</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display text-3xl font-bold text-foreground mb-1">ETH</div>
                        <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Curriculum</div>
                    </div>
                </div>
            </motion.div>

            {/* Algorithm Modal */}
            <AlgorithmModal
                algorithm={selectedAlgorithm}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setTimeout(() => setSelectedAlgorithm(null), 300);
                }}
            />
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
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${isSelected
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "hover:bg-white/5 border border-transparent"
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
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-8 md:p-10"
        >
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                        <span className="text-gradient">File System Visualization</span>
                    </h2>
                    <p className="text-muted-foreground/70 text-sm md:text-base">
                        Interactive file system structure and operations
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        onClick={() => {
                            setFsState(createInitialFS());
                            setNextInode(8);
                            setUsedBlocks(new Set([10, 11, 12, 13, 14, 15, 16]));
                            setOperationLog([]);
                            setSelectedNode(null);
                            addLog(`[${new Date().toLocaleTimeString()}] RESET: File system restored to initial state`);
                        }}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-4 py-2 hover:bg-background/60 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Reset</span>
                    </motion.button>
                    <div className="flex rounded-full border border-white/10 bg-background/40 p-1">
                        <button
                            onClick={() => setViewMode("tree")}
                            className={`px-4 py-2 text-sm rounded-full transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${viewMode === "tree"
                                ? "bg-foreground/10 text-foreground border border-foreground/20"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Tree
                        </button>
                        <button
                            onClick={() => setViewMode("inode")}
                            className={`px-4 py-2 text-sm rounded-full transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${viewMode === "inode"
                                ? "bg-foreground/10 text-foreground border border-foreground/20"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Inode
                        </button>
                        <button
                            onClick={() => setViewMode("operations")}
                            className={`px-4 py-2 text-sm rounded-full transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${viewMode === "operations"
                                ? "bg-foreground/10 text-foreground border border-foreground/20"
                                : "text-muted-foreground hover:text-foreground"
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
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                            Directory Tree
                        </p>
                        <div className="glass rounded-xl border border-white/10 p-6 max-h-[500px] overflow-y-auto">
                            {renderTree(fsState)}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                            Selected Node Info
                        </p>
                        <div className="glass rounded-xl border border-white/10 p-6">
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
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                        Inode Structure
                    </p>
                    <div className="glass rounded-xl border border-white/10 p-6">
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
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                            File Operations
                        </p>
                        <div className="glass rounded-xl border border-white/10 p-4 space-y-3">
                            <motion.button
                                onClick={() => {
                                    const fileName = `newfile_${Date.now()}.txt`;
                                    createFile([], fileName, 1024);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-emerald-400">+</span> Create File (1024 bytes)
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const fileName = "readme.txt";
                                    readFile([], fileName);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-blue-400">→</span> Read File (readme.txt)
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const fileName = "user.txt";
                                    writeFile(["home"], fileName, 512);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-cyan-400">✎</span> Write File (+512 bytes to user.txt)
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const fileName = "config.txt";
                                    deleteFile(["etc"], fileName);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-red-400">×</span> Delete File (config.txt)
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    const dirName = `newdir_${Date.now()}`;
                                    createDirectory([], dirName);
                                }}
                                className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-emerald-400">📁</span> Create Directory
                            </motion.button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                            Operation Log
                        </p>
                        <div className="glass rounded-xl border border-white/10 p-4 max-h-[400px] overflow-y-auto">
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
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-8 md:p-10"
        >
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                        <span className="text-gradient">Process Scheduling Simulation</span>
                    </h2>
                    <p className="text-muted-foreground/70 text-sm md:text-base">
                        Visualizing CPU scheduling algorithms in action
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-background/40 p-1">
                        {(["FCFS", "SJF", "SRTN", "RR", "HRRN", "PRIONP", "MLF", "LCFSPR"] as const).map(
                            (alg) => (
                                <motion.button
                                    key={alg}
                                    onClick={() => {
                                        setStrategy(alg);
                                        setCurrentTime(0);
                                    }}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 ${strategy === alg
                                        ? "bg-foreground/10 text-foreground border border-foreground/20"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
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
                                </motion.button>
                            )
                        )}
                    </div>
                    <motion.button
                        onClick={() => setCurrentTime(0)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-4 py-2 hover:bg-background/60 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Reset</span>
                    </motion.button>
                    <motion.button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-4 py-2 hover:bg-background/60 transition-colors cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                    </motion.button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Process Table */}
                <div className="lg:col-span-1 space-y-4">
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                        Process Queue
                    </p>
                    <div className="glass rounded-xl border border-white/10 p-4 space-y-2">
                        {SAMPLE_PROCESSES.map((proc) => {
                            const isRunning = currentProcess?.processId === proc.id;
                            const scheduleEntry = schedule.find((s) => s.processId === proc.id);
                            const isCompleted = scheduleEntry && currentTime >= scheduleEntry.end;

                            return (
                                <div
                                    key={proc.id}
                                    className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-300 ${isRunning
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
                    <div className="glass rounded-xl border border-white/10 p-4 space-y-3">
                        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-2">
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
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground/60 mb-4">
                        Gantt Chart
                    </p>
                    <div className="glass rounded-xl border border-white/10 p-4">
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
                                        className={`absolute top-0 h-full rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${isActive ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""
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
                    <div className="glass rounded-xl border border-white/10 p-4">
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
            <div className="min-h-screen bg-background overflow-x-hidden">
                <CustomCursor />
                <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                    {/* Animated gradient background - matching Homepage */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 100, 0],
                                y: [0, -50, 0],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, -80, 0],
                                y: [0, 60, 0],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />
                    </div>
                    <div className="text-center relative z-10">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                            Project <span className="text-gradient">Not Found</span>
                        </h1>
                        <motion.button
                            onClick={() => navigate("/")}
                            className="px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-all cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Return Home
                        </motion.button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <CustomCursor />
            <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
                {/* Animated gradient background - matching Homepage */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
                        style={{
                            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            onClick={() => navigate("/#projects")}
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:rounded-md focus:px-2 focus:py-1"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Projects</span>
                        </motion.button>

                        {/* Project Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="mb-12"
                        >
                            <span className="text-muted-foreground/60 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">
                                {project.category}
                            </span>
                            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                                {project.title}
                            </h1>
                            {project.award && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-emerald-500/20 text-emerald-400 text-sm mb-8"
                                >
                                    <span>🏆</span>
                                    <span>{project.award}</span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Tech Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="flex flex-wrap gap-3 mb-12"
                        >
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 glass rounded-full border border-white/10 text-xs text-muted-foreground/80 hover:text-foreground hover:border-white/20 transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            className="mb-12"
                        >
                            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed max-w-3xl">
                                {project.description}
                            </p>
                        </motion.div>

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                            className="flex flex-wrap gap-4 mb-16"
                        >
                            {project.link && project.link !== "#" && (
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/90 transition-all cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Github className="w-5 h-5" />
                                    <span>View on GitHub</span>
                                </motion.a>
                            )}
                            {project.liveLink && (
                                <motion.a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-8 py-4 glass border border-white/10 font-semibold rounded-full hover:bg-white/5 transition-all cursor-hover focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    <span>Live Demo</span>
                                </motion.a>
                            )}
                        </motion.div>

                        {/* Detailed Content Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                            className="space-y-16"
                        >
                            {project.content?.overview && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="glass rounded-2xl p-8 md:p-10"
                                >
                                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                                        <span className="text-gradient">Overview</span>
                                    </h2>
                                    <p className="text-muted-foreground/90 text-base md:text-lg leading-relaxed">
                                        {project.content.overview}
                                    </p>
                                </motion.div>
                            )}

                            {/* Algorithms & runtimes visualisation for ETH Algorithms project */}
                            {project.slug === "eth-algorithms" && (
                                <>
                                    <RuntimeSimulation />
                                    <AlgorithmsOverview />
                                </>
                            )}

                            {/* File System visualisation for System Programming project */}
                            {project.slug === "system-programming" && (
                                <>
                                    <FileSystemSimulation />
                                    <div className="mt-8">
                                        <ProcessSchedulingSimulation />
                                    </div>
                                </>
                            )}

                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProjectDetail;
