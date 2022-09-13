import { ReactElement } from 'react';
import './TInput.css';

interface Props {
  label: string;
  value: string | number;
  onChange?: any;
  onKeyDown?:any;
}

export default function TInput({
  label,
  value,
  onChange,
  onKeyDown
}: Props): ReactElement {
  return (
    <>
      <label className="inp">
        <input type="text" id="inp" value={value} onChange={onChange} onKeyDown={onKeyDown}/>
        <span className="label">{label}</span>
        <span className="focus-bg"></span>
      </label>
    </>
  );
}
