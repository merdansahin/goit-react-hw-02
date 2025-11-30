import { useEffect, useState } from "react";
import Options from "../Options/Options.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Notification from "../Notification/Notification.jsx";
import styles from "./App.module.css";

const LOCAL_KEY = "feedbackData";

export default function App() {
  const [feedbackData, setFeedbackData] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_KEY);
    return savedData ? JSON.parse(savedData) : { good: 0, neutral: 0, bad: 0 };
  });
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(feedbackData));
  }, [feedbackData]);

  const updateFeedback = (type) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [type]: prevData[type] + 1,
    }));
  };
  const resetFeedback = () => {
    setFeedbackData({ good: 0, neutral: 0, bad: 0 });
  };
  const totalFeedback =
    feedbackData.good + feedbackData.neutral + feedbackData.bad;
  const positiveFeedback =
    totalFeedback > 0
      ? Math.round((feedbackData.good / totalFeedback) * 100)
      : 0;
  return (
    <div className={styles.container}>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedbackData.good}
          neutral={feedbackData.neutral}
          bad={feedbackData.bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
