import styles from "./RadioButton.module.scss";

interface RadioButtonProps {
  onSelect: (selected: boolean) => void;
}
const RadioButton = ({ onSelect }: RadioButtonProps) => {
  return (
    <label className={styles.radioDonut}>
      <input type="radio" name="radio-group" onChange={(event) => onSelect(event.target.checked)} />
      <span className={styles.donut}></span>
    </label>
  );
};
export default RadioButton;
