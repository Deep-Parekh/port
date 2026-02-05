'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Play } from 'lucide-react';
import styles from './SortingVisualizer.module.css';

const ARRAY_SIZE = 15;

export default function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number[]>([]);
    const [sortedIndex, setSortedIndex] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<'bubble' | 'insertion' | 'quick'>('bubble');

    const resetArray = () => {
        const newArray = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 80) + 10);
        setArray(newArray);
        setSortedIndex([]);
        setActiveIndex([]);
        setSorting(false);
    };

    useEffect(() => {
        resetArray();
    }, []);

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const bubbleSort = async () => {
        setSorting(true);
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndex([j, j + 1]);
                await sleep(100);

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await sleep(100);
                }
            }
            setSortedIndex((prev) => [...prev, n - i - 1]);
        }
        setSortedIndex((prev) => [...prev, 0]);
        setActiveIndex([]);
        setSorting(false);
    };

    const insertionSort = async () => {
        setSorting(true);
        const arr = [...array];
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            let key = arr[i];
            let j = i - 1;

            setActiveIndex([i, j]);
            await sleep(100);

            while (j >= 0 && arr[j] > key) {
                setActiveIndex([j, j + 1]);
                arr[j + 1] = arr[j];
                setArray([...arr]);
                await sleep(100);
                j = j - 1;
            }
            arr[j + 1] = key;
            setArray([...arr]);
        }

        // Mark all as sorted
        const allIndices = Array.from({ length: n }, (_, i) => i);
        setSortedIndex(allIndices);
        setActiveIndex([]);
        setSorting(false);
    };

    const quickSort = async () => {
        setSorting(true);
        const arr = [...array];
        await quickSortHelper(arr, 0, arr.length - 1);

        // Final sorted state
        const allIndices = Array.from({ length: arr.length }, (_, i) => i);
        setSortedIndex(allIndices);
        setActiveIndex([]);
        setSorting(false);
    };

    const quickSortHelper = async (arr: number[], low: number, high: number) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        } else if (low === high) {
            // Single element considered sorted in this recursion branch
            // setSortedIndex(prev => [...prev, low]); // Optional: progressively mark sorted
        }
    };

    const partition = async (arr: number[], low: number, high: number) => {
        const pivot = arr[high];
        setActiveIndex([high]); // Highlight pivot
        let i = low - 1;

        for (let j = low; j < high; j++) {
            setActiveIndex([j, high]);
            await sleep(50);

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await sleep(50);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
        await sleep(50);
        return i + 1;
    };

    const handleSort = () => {
        if (algorithm === 'bubble') bubbleSort();
        else if (algorithm === 'insertion') insertionSort();
        else if (algorithm === 'quick') quickSort();
    };

    return (
        <div className={styles.vizContainer}>
            <div className={styles.controls}>
                <div className={styles.title}>Sorting Viz</div>
                <div className={styles.buttons}>
                    <select
                        className={styles.select}
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value as any)}
                        disabled={sorting}
                    >
                        <option value="bubble">Bubble Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="quick">Quick Sort</option>
                    </select>
                    <button className={styles.btn} onClick={resetArray} disabled={sorting}>
                        <RefreshCw size={14} /> New
                    </button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSort} disabled={sorting}>
                        <Play size={14} fill="currentColor" /> Sort
                    </button>
                </div>
            </div>
            <div className={styles.canvas}>
                {array.map((value, idx) => {
                    let extraClass = '';
                    if (activeIndex.includes(idx)) extraClass = styles.active;
                    if (sortedIndex.includes(idx)) extraClass = styles.sorted;

                    return (
                        <div
                            key={idx}
                            className={`${styles.bar} ${extraClass}`}
                            style={{ height: `${value}%` }}
                            title={value.toString()}
                        />
                    );
                })}
            </div>
        </div>
    );
}
