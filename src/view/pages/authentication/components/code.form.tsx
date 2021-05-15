import { useState } from "react";

interface PropsType {
  onSubmit: (str: string) => void;
}
const CodeForm = (props: PropsType) => {
  const [code, setCode] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(code);
  };
  return (
    <form onSubmit={submit}>
      <label>
        <div>Code</div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="number"
        />
      </label>
      <br />
      <button>Submit</button>
    </form>
  );
};

export default CodeForm;
