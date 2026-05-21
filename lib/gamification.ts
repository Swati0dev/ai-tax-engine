export const LEVELS = [
  { level: 1, name: "Tax Novice", xpRequired: 0 },
  { level: 2, name: "Tax Learner", xpRequired: 100 },
  { level: 3, name: "Deduction Hunter", xpRequired: 250 },
  { level: 4, name: "Return Filer", xpRequired: 500 },
  { level: 5, name: "Tax Ninja", xpRequired: 1000 },
  { level: 6, name: "Wealth Builder", xpRequired: 2000 },
];

export interface GamificationState {
  xp: number;
  level: number;
  title: string;
}

export const getGamificationState = (): GamificationState => {
  if (typeof window === "undefined") {
    return { xp: 0, level: 1, title: LEVELS[0].name };
  }
  const xp = parseInt(localStorage.getItem("userXp") || "0", 10);
  
  let currentLevel = LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i];
      break;
    }
  }

  return {
    xp,
    level: currentLevel.level,
    title: currentLevel.name,
  };
};

export const addXp = (amount: number): GamificationState => {
  if (typeof window === "undefined") return { xp: 0, level: 1, title: LEVELS[0].name };
  
  const currentXp = parseInt(localStorage.getItem("userXp") || "0", 10);
  const newXp = currentXp + amount;
  localStorage.setItem("userXp", newXp.toString());
  
  // Custom event so the Header can listen and update instantly
  window.dispatchEvent(new Event('gamification-update'));
  
  return getGamificationState();
};
