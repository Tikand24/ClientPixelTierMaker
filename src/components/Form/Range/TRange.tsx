import { ReactElement } from 'react';

interface Props {
  label: string;
  value: number;
  onChange?: any;
}

export default function TRange({
  onChange,
  label,
  value,
}: Props): ReactElement {
  return (
    <>
      <label>{label} </label>
      <div>
      <span>
        <small>pixeles: <strong>{value*value} pixeles</strong></small>
      </span>
      </div>
      <div>
      <input
        type="range"
        min="2"
        max="20"
        step="1"
        onChange={onChange}
        value={value}
      />
      </div>
    </>
  );
}
