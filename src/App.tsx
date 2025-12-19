import { useHourCalculator } from './hooks/useHourCalculator';
import { Display } from './components/Display';
import { ControlPanel } from './components/ControlPanel';
import { HistoryList } from './components/HistoryList';

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
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
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
          <p>Local Storage Enabled • Unit Definitions: 1h = 60m</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
