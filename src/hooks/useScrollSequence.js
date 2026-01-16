import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Scroll Sequence State Machine
 * 
 * States:
 * - S1_IDLE_AT_START: At top of page, Section 1 visible, no animation played
 * - S1_PLAYING_FORWARD: Section 1 forward animation in progress
 * - S1_DONE: Section 1 forward complete, ready for Section 2
 * - S2_PLAYING_FORWARD: Section 2 forward animation in progress
 * - S2_DONE_UNLOCKED: Section 2 complete, normal scroll enabled
 * - S2_PLAYING_REVERSE: Section 2 reverse animation in progress
 * - S1_PLAYING_REVERSE: Section 1 reverse animation in progress
 */

export const SCROLL_STATES = {
  S1_IDLE_AT_START: 'S1_IDLE_AT_START',
  S1_PLAYING_FORWARD: 'S1_PLAYING_FORWARD',
  S1_DONE: 'S1_DONE',
  S2_PLAYING_FORWARD: 'S2_PLAYING_FORWARD',
  S2_DONE_UNLOCKED: 'S2_DONE_UNLOCKED',
  S2_PLAYING_REVERSE: 'S2_PLAYING_REVERSE',
  S1_PLAYING_REVERSE: 'S1_PLAYING_REVERSE',
};

export function useScrollSequence({
  section1Ref,
  section2Ref,
  onStateChange,
  reducedMotion = false,
}) {
  const [state, setState] = useState(SCROLL_STATES.S1_IDLE_AT_START);
  const [activeSection, setActiveSection] = useState(1);
  const [isLocked, setIsLocked] = useState(true);
  
  const isAnimatingRef = useRef(false);
  const scrollQueueRef = useRef([]);
  const lastScrollTimeRef = useRef(0);
  const scrollAccumulatorRef = useRef(0);
  const stateRef = useRef(state);

  // Keep stateRef in sync
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Notify parent of state changes
  useEffect(() => {
    if (onStateChange) {
      onStateChange(state, activeSection, isLocked);
    }
  }, [state, activeSection, isLocked, onStateChange]);

  // Handle reduced motion preference
  useEffect(() => {
    if (reducedMotion) {
      setIsLocked(false);
      setState(SCROLL_STATES.S2_DONE_UNLOCKED);
      setActiveSection(2);
    }
  }, [reducedMotion]);

  const transitionTo = useCallback((newState) => {
    setState(newState);
    
    // Update lock state based on new state
    const unlockedStates = [SCROLL_STATES.S2_DONE_UNLOCKED];
    setIsLocked(!unlockedStates.includes(newState));
    
    // Update active section
    if (newState.startsWith('S1_')) {
      setActiveSection(1);
    } else if (newState.startsWith('S2_')) {
      setActiveSection(2);
    }
  }, []);

  const playSection1Forward = useCallback(async () => {
    if (isAnimatingRef.current || reducedMotion) return;
    
    isAnimatingRef.current = true;
    transitionTo(SCROLL_STATES.S1_PLAYING_FORWARD);
    
    try {
      if (section1Ref.current?.playForward) {
        await section1Ref.current.playForward();
      }
      transitionTo(SCROLL_STATES.S1_DONE);
    } catch (error) {
      console.error('Section 1 forward animation failed:', error);
      transitionTo(SCROLL_STATES.S1_DONE);
    } finally {
      isAnimatingRef.current = false;
      processQueue();
    }
  }, [section1Ref, transitionTo, reducedMotion]);

  const playSection1Reverse = useCallback(async () => {
    if (isAnimatingRef.current || reducedMotion) return;
    
    isAnimatingRef.current = true;
    transitionTo(SCROLL_STATES.S1_PLAYING_REVERSE);
    
    try {
      if (section1Ref.current?.playReverse) {
        await section1Ref.current.playReverse();
      }
      transitionTo(SCROLL_STATES.S1_IDLE_AT_START);
    } catch (error) {
      console.error('Section 1 reverse animation failed:', error);
      transitionTo(SCROLL_STATES.S1_IDLE_AT_START);
    } finally {
      isAnimatingRef.current = false;
      processQueue();
    }
  }, [section1Ref, transitionTo, reducedMotion]);

  const playSection2Forward = useCallback(async () => {
    if (isAnimatingRef.current || reducedMotion) return;
    
    isAnimatingRef.current = true;
    transitionTo(SCROLL_STATES.S2_PLAYING_FORWARD);
    
    try {
      if (section2Ref.current?.playForward) {
        await section2Ref.current.playForward();
      }
      transitionTo(SCROLL_STATES.S2_DONE_UNLOCKED);
    } catch (error) {
      console.error('Section 2 forward animation failed:', error);
      transitionTo(SCROLL_STATES.S2_DONE_UNLOCKED);
    } finally {
      isAnimatingRef.current = false;
      processQueue();
    }
  }, [section2Ref, transitionTo, reducedMotion]);

  const playSection2Reverse = useCallback(async () => {
    if (isAnimatingRef.current || reducedMotion) return;
    
    isAnimatingRef.current = true;
    transitionTo(SCROLL_STATES.S2_PLAYING_REVERSE);
    
    try {
      if (section2Ref.current?.playReverse) {
        await section2Ref.current.playReverse();
      }
      transitionTo(SCROLL_STATES.S1_DONE);
    } catch (error) {
      console.error('Section 2 reverse animation failed:', error);
      transitionTo(SCROLL_STATES.S1_DONE);
    } finally {
      isAnimatingRef.current = false;
      processQueue();
    }
  }, [section2Ref, transitionTo, reducedMotion]);

  const processQueue = useCallback(() => {
    if (scrollQueueRef.current.length > 0 && !isAnimatingRef.current) {
      const nextAction = scrollQueueRef.current.shift();
      if (nextAction) {
        nextAction();
      }
    }
  }, []);

  const queueAction = useCallback((action) => {
    // Only queue if not already animating, otherwise ignore
    if (!isAnimatingRef.current) {
      action();
    }
    // Don't queue multiple actions - ignore extra scroll inputs during animation
  }, []);

  const handleScrollDown = useCallback(() => {
    const currentState = stateRef.current;
    
    switch (currentState) {
      case SCROLL_STATES.S1_IDLE_AT_START:
        queueAction(playSection1Forward);
        break;
      case SCROLL_STATES.S1_DONE:
        queueAction(playSection2Forward);
        break;
      case SCROLL_STATES.S2_DONE_UNLOCKED:
        // Normal scroll - do nothing, let browser handle it
        break;
      default:
        // Animation in progress - ignore
        break;
    }
  }, [playSection1Forward, playSection2Forward, queueAction]);

  const handleScrollUp = useCallback(() => {
    const currentState = stateRef.current;
    
    switch (currentState) {
      case SCROLL_STATES.S1_DONE:
        queueAction(playSection1Reverse);
        break;
      case SCROLL_STATES.S2_DONE_UNLOCKED:
        // Check if we're at the boundary (top of static content)
        // This will be handled by the scroll listener
        break;
      default:
        // Animation in progress - ignore
        break;
    }
  }, [playSection1Reverse, queueAction]);

  // Snap to Section 2 when returning from static content
  const snapToSection2 = useCallback(() => {
    if (stateRef.current === SCROLL_STATES.S2_DONE_UNLOCKED && !isAnimatingRef.current) {
      queueAction(playSection2Reverse);
    }
  }, [playSection2Reverse, queueAction]);

  // Continue reverse from Section 2 to Section 1
  const continueReverseToSection1 = useCallback(() => {
    if (stateRef.current === SCROLL_STATES.S1_DONE && !isAnimatingRef.current) {
      queueAction(playSection1Reverse);
    }
  }, [playSection1Reverse, queueAction]);

  return {
    state,
    activeSection,
    isLocked,
    isAnimating: isAnimatingRef.current,
    handleScrollDown,
    handleScrollUp,
    snapToSection2,
    continueReverseToSection1,
    transitionTo,
  };
}

export default useScrollSequence;
