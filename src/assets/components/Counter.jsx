import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2 style={styles.count}>{count}</h2>

      <div style={styles.buttonGroup}>
        <button style={styles.btn} onClick={() => setCount(count + 1)}>
          ➕
        </button>
        <button style={styles.btn} onClick={() => setCount(count - 1)}>
          ➖
        </button>
        <button style={styles.reset} onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

const styles = {
  count: {
    fontSize: "48px",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  btn: {
    padding: "12px 18px",
    fontSize: "20px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "#ffffff",
    color: "#764ba2",
    fontWeight: "bold",
    transition: "0.3s",
  },
  reset: {
    padding: "12px 18px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "#ff4d4d",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default Counter;
