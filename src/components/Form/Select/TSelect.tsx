import { ReactElement } from 'react';
import { SelectOptions } from '../../../typings/Form';

interface Props{
    label:string;
    value:string | number | readonly string[] | undefined;
    onChange?:any
    options:SelectOptions[];
}

export default function TSelect({label,value,options,onChange}:Props): ReactElement {
  return (
    <>
      <div>
        <div>
          <label htmlFor="selectPrefile">{label}</label>
        </div>
        <div>
          <select id="selectPreFile" className='p-2 w-full' value={value} onChange={onChange}>
          <option value={undefined}>Seleccione un dato</option>
            {options.map(option=>(<option value={option.value}>{option.description}</option>))}
          </select>
        </div>
      </div>
    </>
  );
}
