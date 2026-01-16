// Dev-only performance monitor component
// Shows current quality level and allows manual override

export default function PerformanceMonitor({ quality, setManualQuality, manualOverride }) {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="perf-monitor">
      <span className="perf-monitor__label">Quality:</span>
      <select
        className="perf-monitor__select"
        value={manualOverride || 'AUTO'}
        onChange={(e) => setManualQuality(e.target.value)}
      >
        <option value="AUTO">Auto ({quality.name})</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
        <option value="FALLBACK">Fallback</option>
      </select>
    </div>
  );
}
