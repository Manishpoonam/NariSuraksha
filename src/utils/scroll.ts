/**
 * Smooth scrolling utility with visual target indicator for crisis response
 */

export function smoothScrollTo(elementIdOrSelector: string, extraMargin: number = 24): void {
  // Run on next tick to allow React re-renders and AnimatePresence mount
  setTimeout(() => {
    let targetEl: HTMLElement | null = null;
    
    if (elementIdOrSelector.startsWith('#') || elementIdOrSelector.startsWith('.')) {
      targetEl = document.querySelector(elementIdOrSelector) as HTMLElement;
    } else {
      targetEl = document.getElementById(elementIdOrSelector);
      if (!targetEl) {
        targetEl = document.querySelector(elementIdOrSelector) as HTMLElement;
      }
    }

    if (targetEl) {
      // Calculate dynamic header height on the fly
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 140;
      
      // Always guarantee offset is headerHeight + positive margin so content is NEVER hidden
      const totalOffset = headerHeight + Math.max(extraMargin, 16);

      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      // Temporary visual glow to guide user's eyes directly to the selected section
      targetEl.classList.add('transition-all', 'duration-500', 'ring-2', 'ring-[#8B6D5C]', 'ring-offset-2');
      setTimeout(() => {
        targetEl?.classList.remove('ring-2', 'ring-[#8B6D5C]', 'ring-offset-2');
      }, 1400);
    }
  }, 80);
}
