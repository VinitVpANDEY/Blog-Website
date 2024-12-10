import { FaSun, FaMoon } from 'react-icons/fa'; // Import from Font Awesome via React Icons
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded transition"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <FaMoon className="h-6 w-6" /> : <FaSun className="h-6 w-6" />}
    </button>
  );
};

export default ThemeToggle;
