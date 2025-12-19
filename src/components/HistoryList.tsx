import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, RotateCcw } from 'lucide-react';
import type { TimeRecord } from '../hooks/useHourCalculator';

interface HistoryListProps {
    history: TimeRecord[];
    onClear: () => void;
    onUndo: (id: string) => void;
}

export const HistoryList = ({ history, onClear, onUndo }: HistoryListProps) => {
    if (history.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
        >
            <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <HistoryIcon className="w-4 h-4" /> History
                </h3>
                <button
                    onClick={onClear}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                    {history.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            layout
                            className="bg-card/50 border border-border/50 p-3 rounded-xl flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.operation === 'add'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    {item.operation === 'add' ? '+' : '-'}
                                </span>
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">
                                        {item.hours}h {item.minutes}m
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                        {new Date(item.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => onUndo(item.id)}
                                className="p-2 text-muted-foreground hover:text-primary hover:bg-background rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Undo"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
