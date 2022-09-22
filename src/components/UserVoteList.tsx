import { ReactElement, useState } from 'react';
import { Message } from '../typings/Message';

interface Props {
  messages: string[];
}
export default function UserVoteList({ messages }: Props): ReactElement {
  const [openConfig, setOpenConfig] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [showParticle, setShowParticle] = useState(false);
  const itemSelected = {
    _id: 51231,
    name: '',
    image: '',
  };

  const handleApplyPreview = () => {
    setOpenPreview(false);
    setShowParticle(false);
    setTimeout(() => {
      setShowParticle(true);
    }, 500);
    setTimeout(() => {
      setOpenPreview(true);
    }, 1000);
  };

  if (openConfig) {
    return (
      <>
        <div className="absolute inset-y-1/3 border-4 border-gray-500 bg-white left-0 w-80 h-96 rounded-l-lg z-10">
          <div className="flex mx-3">
            <div className='grow text-2xl font-bold'>
              Listado de Usuarios
              </div>
            <div className="self-end cursor-pointer p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={() => setOpenConfig(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex mx-3">
            <div className="overflow-y-auto h-80 grow ">
              {messages.map((message, index) => (
                <div key={`${message}${index}`}>{message}</div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="absolute inset-y-1/2 left-0 bg-gray-500 hover:bg-gray-400 w-16 h-14 rounded-r-lg cursor-pointer"
        onClick={() => setOpenConfig(true)}
      >
        <div className="static ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 25 25"
            strokeWidth={1.5}
            stroke="white"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
            />
          </svg>
          <div className="absolute -top-4 -right-4">
            <div className=" rounded-full p-2 text-white text-lg font-bold tabular-nums bg-green-500">
              {messages.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
