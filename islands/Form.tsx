export default function From() {
  return (
    <div>
      <form className="FormField" name="question">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <label className="FormLabel">Question</label>
          <div className="FormMessage">
            Please enter a question
          </div>
        </div>
        <textarea className="Textarea" name="q" required />
        <button className="Button" style={{ marginTop: 10 }}>
          Post question
        </button>
      </form>
    </div>
  );
}
