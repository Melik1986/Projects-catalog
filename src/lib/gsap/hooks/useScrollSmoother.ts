import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface ScrollSmootherOptions {
  smooth?: number;
  effects?: boolean;
  smoothTouch?: number;
  normalizeScroll?: boolean;
  ignoreMobileResize?: boolean;
  preventDefault?: boolean;
  fixedBackground?: boolean;
  speed?: number;
}

interface ScrollSmootherInstance {
  smoother: ScrollSmoother | null;
  scrollTo: (target: string | number | Element, smooth?: boolean) => void;
  refresh: () => void;
  paused: (value?: boolean) => boolean | undefined;
  kill: () => void;
}

// Helper functions extracted to reduce function size
const createScrollHandlers = (
  smootherRef: React.MutableRefObject<ScrollSmoother | null>,
  setSmoother: React.Dispatch<React.SetStateAction<ScrollSmoother | null>>
) => {
  const scrollTo = (target: string | number | Element, smooth = true) => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(target, smooth);
    }
  };

  const refresh = () => {
    if (smootherRef.current) {
      smootherRef.current.refresh();
      ScrollTrigger.refresh();
    }
  };

  const paused = (value?: boolean) => {
    if (smootherRef.current) {
      if (value !== undefined) {
        smootherRef.current.paused(value);
      }
      return smootherRef.current.paused();
    }
    return undefined;
  };

  const kill = () => {
    if (smootherRef.current) {
      smootherRef.current.kill();
      smootherRef.current = null;
      setSmoother(null);
    }
  };

  return { scrollTo, refresh, paused, kill };
};

export const useScrollSmoother = (
  options: ScrollSmootherOptions = {}
): ScrollSmootherInstance => {
  const [smoother, setSmoother] = useState<ScrollSmoother | null>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const handlers = createScrollHandlers(smootherRef, setSmoother);

  useEffect(() => {
    const effect = createSmootherEffect(
      options,
      wrapperRef,
      contentRef,
      smootherRef,
      setSmoother
    );
    return effect;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    smoother,
    ...handlers,
  };
};

// Helper function to create or get wrapper element
function getOrCreateWrapper(): HTMLElement {
  let wrapper = document.querySelector('#smooth-wrapper') as HTMLElement;
  
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'smooth-wrapper';
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.overflow = 'hidden';
    
    // Wrap existing body content
    const bodyChildren = Array.from(document.body.children);
    bodyChildren.forEach(child => {
      if (child.id !== 'smooth-wrapper') {
        wrapper.appendChild(child);
      }
    });
    
    document.body.appendChild(wrapper);
  }
  
  return wrapper;
}

// Helper function to create or get content element
function getOrCreateContent(wrapper: HTMLElement): HTMLElement {
  let content = document.querySelector('#smooth-content') as HTMLElement;
  
  if (!content) {
    content = document.createElement('div');
    content.id = 'smooth-content';
    
    // Move wrapper children to content
    const wrapperChildren = Array.from(wrapper.children);
    wrapperChildren.forEach(child => {
      if (child.id !== 'smooth-content') {
        content.appendChild(child);
      }
    });
    
    wrapper.appendChild(content);
  }
  
  return content;
}

// Helper function to create ScrollSmoother configuration
function createSmootherConfig(
  wrapper: HTMLElement,
  content: HTMLElement,
  options: ScrollSmootherOptions
) {
  return {
    wrapper: wrapper,
    content: content,
    smooth: options.smooth ?? 1,
    effects: options.effects ?? false,
    smoothTouch: options.smoothTouch ?? 0.1,
    normalizeScroll: options.normalizeScroll ?? false,
    ignoreMobileResize: options.ignoreMobileResize ?? true,
    preventDefault: options.preventDefault ?? true,
    fixedBackground: options.fixedBackground ?? false,
    speed: options.speed ?? 1,
    onUpdate: (self: ScrollSmoother) => {
      const progress = self.progress;
      const velocity = self.getVelocity();
      
      window.dispatchEvent(
        new CustomEvent('smoothscroll', {
          detail: { progress, velocity, scrollY: self.scrollTop() }
        })
      );
    },
    onStop: () => {
      window.dispatchEvent(new CustomEvent('smoothscrollstop'));
    }
  };
}

// Helper function to setup event listeners
function setupEventListeners(
  smootherInstance: ScrollSmoother
): () => void {
  const handleResize = () => {
    if (smootherInstance) {
      smootherInstance.refresh();
      ScrollTrigger.refresh();
    }
  };

  let resizeTimer: ReturnType<typeof setTimeout>;
  const debouncedResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  };

  const handleRouteChange = () => {
    setTimeout(() => {
      if (smootherInstance) {
        smootherInstance.refresh();
        ScrollTrigger.refresh();
      }
    }, 100);
  };

  window.addEventListener('resize', debouncedResize);
  window.addEventListener('popstate', handleRouteChange);

  return () => {
    window.removeEventListener('resize', debouncedResize);
    window.removeEventListener('popstate', handleRouteChange);
    clearTimeout(resizeTimer);
  };
}

// Main effect function - now much smaller
function createSmootherEffect(
  options: ScrollSmootherOptions,
  wrapperRef: React.MutableRefObject<HTMLElement | null>,
  contentRef: React.MutableRefObject<HTMLElement | null>,
  smootherRef: React.MutableRefObject<ScrollSmoother | null>,
  setSmoother: React.Dispatch<React.SetStateAction<ScrollSmoother | null>>
) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const initTimeout = setTimeout(() => {
    const wrapper = getOrCreateWrapper();
    const content = getOrCreateContent(wrapper);
    
    wrapperRef.current = wrapper;
    contentRef.current = content;

    try {
      const config = createSmootherConfig(wrapper, content, options);
      const smootherInstance = ScrollSmoother.create(config);
      
      smootherRef.current = smootherInstance;
      setSmoother(smootherInstance);

      const cleanup = setupEventListeners(smootherInstance);

      return () => {
        cleanup();
        if (smootherInstance) {
          smootherInstance.kill();
        }
        smootherRef.current = null;
        setSmoother(null);
      };
    } catch (error) {
      console.error('Failed to initialize ScrollSmoother:', error);
      return () => {};
    }
  }, 100);

  return () => {
    clearTimeout(initTimeout);
  };
}

export default useScrollSmoother;