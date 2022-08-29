import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory([...history, newMode]);
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length-2]);

      const newHistory = [...history];

      setHistory(newHistory.slice(0, -1));

    }
  }

  return { mode, transition, back };
}

