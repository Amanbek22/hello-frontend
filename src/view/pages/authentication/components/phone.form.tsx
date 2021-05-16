import { useState } from "react";

interface PropsType {
  onSubmit: (str: string) => void;
}
const PhoneForm = (props: PropsType) => {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(email);
  };
  return (
    <form onSubmit={submit}>
      <label>
        <div>email</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="number"
        />
      </label>
      <br />
      <button>Submit</button>
    </form>
  );
};

export default PhoneForm;
