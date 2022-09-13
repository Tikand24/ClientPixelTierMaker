import { ReactElement } from 'react';

interface Props {
  tag: string;
  removeTag?: any;
}

export default function Chip({ tag, removeTag }: Props): ReactElement {
  return (
    <div className="bg-gray-300 rounded-full w-fit px-5 py-1 h-3/4 mx-1 my-4">
      <div className="flex">
        <div>{tag}</div>
        {removeTag && (
          <div
            className="ml-2 mt-1 cursor-pointer"
            onClick={() => removeTag(tag)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
