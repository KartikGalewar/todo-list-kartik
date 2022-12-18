import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  settodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, settodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="input__box"
        placeholder="Enter to do list"
        value={todo}
        onChange={(e) => settodo(e.target.value)}
      />
      <button type="submit" className="input__submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
