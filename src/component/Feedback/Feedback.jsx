import styles from "./Feedback.module.css";
export default function Feedback({ good, neutral, bad, total, positive }) {
  return (
    <div className={styles.box}>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Positive Feedback: {positive}%</p>
    </div>
  );
}
