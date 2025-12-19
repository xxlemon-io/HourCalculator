import { useState, useEffect } from 'react';

export type TimeRecord = {
    id: string;
    hours: number;
    minutes: number;
    operation: 'add' | 'subtract';
    timestamp: number;
    resultSeconds: number; // Result after this operation
};

export type ConversionResult = {
    totalSeconds: number;
    hours: number;
    minutes: number;
    seconds: number;
    decimalHours: number;
};

export const useHourCalculator = () => {
    const [currentSeconds, setCurrentSeconds] = useState(() => {
        try {
            const saved = localStorage.getItem('hour-calculator-current-seconds');
            return saved ? parseInt(saved, 10) : 0;
        } catch {
            return 0;
        }
    });

    const [history, setHistory] = useState<TimeRecord[]>(() => {
        try {
            const saved = localStorage.getItem('hour-calculator-history');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('hour-calculator-current-seconds', currentSeconds.toString());
        localStorage.setItem('hour-calculator-history', JSON.stringify(history));
    }, [currentSeconds, history]);

    const calculate = (hours: number, minutes: number, operation: 'add' | 'subtract') => {
        const inputSeconds = (hours * 3600) + (minutes * 60);
        const newSeconds = operation === 'add'
            ? currentSeconds + inputSeconds
            : currentSeconds - inputSeconds;

        const record: TimeRecord = {
            id: crypto.randomUUID(),
            hours,
            minutes,
            operation,
            timestamp: Date.now(),
            resultSeconds: newSeconds,
        };

        setCurrentSeconds(newSeconds);
        setHistory(prev => [record, ...prev]);
    };

    const clearHistory = () => {
        setHistory([]);
        setCurrentSeconds(0);
    };

    const getConversions = (totalSecs: number): ConversionResult => {
        const absSeconds = Math.abs(totalSecs);
        const h = Math.floor(absSeconds / 3600);
        const m = Math.floor((absSeconds % 3600) / 60);
        const s = absSeconds % 60;

        return {
            totalSeconds: totalSecs,
            hours: totalSecs < 0 ? -h : h,
            minutes: m,
            seconds: s,
            decimalHours: Number((totalSecs / 3600).toFixed(4)),
        };
    };

    const undo = (id: string) => {
        // Advanced: Rebuild state from history excluding the undone item?
        // For simplicity, we just remove the item and recalculate everything from 0
        const newHistory = history.filter(item => item.id !== id);
        // Recalculate
        let secs = 0;
        // History is stored new to old, so we reverse to replay
        [...newHistory].reverse().forEach(item => {
            const input = (item.hours * 3600) + (item.minutes * 60);
            secs = item.operation === 'add' ? secs + input : secs - input;
        });

        setHistory(newHistory);
        setCurrentSeconds(secs);
    };

    return {
        currentSeconds,
        history,
        calculate,
        clearHistory,
        undo,
        getConversions
    };
};
