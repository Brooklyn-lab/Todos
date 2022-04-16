import "./Theme.scss";
import { useContext } from "react";
import ThemeContext from "../../context";

const Theme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme(!theme);
  }

  return (
    <div className="theme">
      <input
        type="checkbox"
        className="theme__checkbox"
        id="box"
        defaultChecked={theme}
        onChange={toggleTheme}
      />
      <label htmlFor="box" />
    </div>
  );
};

export default Theme;
