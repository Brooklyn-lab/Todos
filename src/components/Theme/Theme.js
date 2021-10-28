import "./Theme.scss";

const Theme = ({ theme, setTheme }) => {
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
