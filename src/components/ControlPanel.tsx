import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';


interface ControlPanelProps {
    onCalculate: (h: number, m: number, op: 'add' | 'subtract') => void;
}

export const ControlPanel = ({ onCalculate }: ControlPanelProps) => {
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    const handleAction = (op: 'add' | 'subtract') => {
        const h = parseInt(hours || '0', 10);
        const m = parseInt(minutes || '0', 10);

        if (h === 0 && m === 0) return;

        onCalculate(h, m, op);
        setHours('');
        setMinutes('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-6 rounded-3xl shadow-sm border border-border/50 space-y-6"
        >
            <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Hours</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                            placeholder="0"
                            className="w-full bg-background border border-input rounded-2xl p-4 text-2xl font-bold text-center focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">h</span>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Minutes</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                            placeholder="0"
                            className="w-full bg-background border border-input rounded-2xl p-4 text-2xl font-bold text-center focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/20"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">m</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => handleAction('add')}
                    className="flex-1 bg-primary text-primary-foreground p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-6 h-6" /> Add
                </button>
                <button
                    onClick={() => handleAction('subtract')}
                    className="flex-1 bg-secondary text-secondary-foreground border border-border p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary/80 active:scale-95 transition-all"
                >
                    <Minus className="w-6 h-6" /> Subtract
                </button>
            </div>
        </motion.div>
    );
};
