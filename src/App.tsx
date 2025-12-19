import { useHourCalculator } from './hooks/useHourCalculator';
import { Display } from './components/Display';
import { ControlPanel } from './components/ControlPanel';
import { HistoryList } from './components/HistoryList';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const {
    currentSeconds,
    history,
    calculate,
    clearHistory,
    undo,
    getConversions
  } = useHourCalculator();

  const conversions = getConversions(currentSeconds);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="relative text-center space-y-2">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl pt-2 flex items-center justify-center gap-2">
            <span className="text-4xl">⏱️</span>
            Hour Calculator
          </h1>
          <p className="text-muted-foreground text-sm">
            Add, subtract, and convert time instantly.
          </p>
        </div>

        {/* Main Interface */}
        <div className="space-y-6">
          <Display conversions={conversions} />

          <ControlPanel onCalculate={calculate} />

          <HistoryList
            history={history}
            onClear={clearHistory}
            onUndo={undo}
          />
        </div>

        <footer className="pt-8 text-center text-xs text-muted-foreground/50">
          <p>
            built by{' '}
            <a
              href="https://github.com/xxlemon-io/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              xxlemon.io
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
