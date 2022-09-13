import { ReactElement } from 'react';
interface Props {
  label: string;
  value: string | number | readonly string[] | undefined;
  onChange?: any;
}

export default function TFile({ label, value, onChange }: Props): ReactElement {
  return (
    <>
      <label className="inp">
        <input
          type="file"
          id="fileInp"
          value={value}
          onChange={onChange}
          multiple
          accept="image/png, image/jpeg"
        />
        <span className="label">{label}</span>
        <span className="focus-bg"></span>
      </label>
    </>
  );
}
