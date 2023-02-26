import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  onSelect: (selected: boolean) => void;
}
const CheckBox = ({ onSelect }: CheckBoxProps) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" onChange={(event) => onSelect(event.target.checked)} />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default CheckBox;
