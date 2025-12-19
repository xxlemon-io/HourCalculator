import { motion } from 'framer-motion';
import type { ConversionResult } from '../hooks/useHourCalculator';

interface DisplayProps {
    conversions: ConversionResult;
}

export const Display = ({ conversions }: DisplayProps) => {
    const { hours, minutes, decimalHours, totalSeconds } = conversions;

    const isNegative = totalSeconds < 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card text-card-foreground p-6 rounded-3xl shadow-lg border border-border/50 text-center space-y-4"
        >
            <div className="space-y-1">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Total Time</h2>
                <div className="text-5xl font-bold tracking-tight text-primary font-sans">
                    {isNegative && '-'}{Math.abs(hours)}<span className="text-2xl text-muted-foreground">h</span>{' '}
                    {Math.abs(minutes)}<span className="text-2xl text-muted-foreground">m</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
                <div className="flex flex-col p-2 bg-secondary/50 rounded-xl">
                    <span className="text-xs text-muted-foreground">Decimal</span>
                    <span className="font-mono font-semibold">{decimalHours}h</span>
                </div>
                <div className="flex flex-col p-2 bg-secondary/50 rounded-xl">
                    <span className="text-xs text-muted-foreground">Minutes</span>
                    <span className="font-mono font-semibold">{Math.round(totalSeconds / 60)}m</span>
                </div>
                <div className="flex flex-col p-2 bg-secondary/50 rounded-xl">
                    <span className="text-xs text-muted-foreground">Seconds</span>
                    <span className="font-mono font-semibold">{totalSeconds}s</span>
                </div>
            </div>
        </motion.div>
    );
};
