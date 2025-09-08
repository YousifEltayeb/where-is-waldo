import { useState, useEffect } from 'react';

export const useAlerts = () => {
  const [showHitAlert, setShowHitAlert] = useState(false);
  const [showMissAlert, setShowMissAlert] = useState(false);
  useEffect(() => {
    if (showHitAlert) {
      const toRef = setTimeout(() => {
        setShowHitAlert(false);
        clearTimeout(toRef);
      }, 2000);
    }
  }, [showHitAlert]);

  useEffect(() => {
    if (showMissAlert) {
      const toRef = setTimeout(() => {
        setShowMissAlert(false);
        clearTimeout(toRef);
      }, 2000);
    }
  }, [showMissAlert]);

  const showHit = () => setShowHitAlert(true);
  const showMiss = () => setShowMissAlert(true);

  return {
    showHitAlert,
    showMissAlert,
    showHit,
    showMiss,
  };
};
