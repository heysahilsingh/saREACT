import React, { useEffect, useState } from "react";

type AppearanceType = "DARK" | "LIGHT";

const ThemeAppearanceBtn = (props: { className: string }) => {
  const appearance = localStorage.getItem("themeAppearance");
  const devicePreference: AppearanceType =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "DARK" : "LIGHT";

  const [themeAppearance, setThemeAppearance] = useState<AppearanceType | string>(appearance || devicePreference);

  // Effect to monitor changes in the themeAppearance state
  useEffect(() => {
    // Remove both classes and then add the appropriate one
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeAppearance === "DARK" ? "dark" : "light");

    // Add a listener for changes in the user's preferred color scheme (light/dark)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setThemeAppearance(e.matches ? "DARK" : "LIGHT");

    // Add the event listener and clean it up
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [themeAppearance]);

  // Function to toggle the theme appearance
  const toggleTheme = () => {
    const newTheme = themeAppearance === "LIGHT" ? "DARK" : "LIGHT";
    setThemeAppearance(newTheme);
    localStorage.setItem("themeAppearance", newTheme);
  };

  return (
    <div className={props.className}>
      <input
        className="cursor-pointer sa-dark-toggle"
        type="checkbox"
        name="themeToggle"
        id="themeToggle"
        checked={themeAppearance === "DARK"}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeAppearanceBtn;

