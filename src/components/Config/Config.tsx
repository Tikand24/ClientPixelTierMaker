import { ReactElement, useState } from 'react';
import TInput from '../Form/Input/TInput';
import TRange from '../Form/Range/TRange';
import ImageParticle from '../ImageParticle/ImageParticle';
import imgUrlPreview from '../../assets/imageparticlepreview.jpg';
import API from '../../api/api';

interface Props {
  command: string;
  rangeQuadrant: number;
  channel:string;
  onChangeCommandChat?: any;
  onChangeQuadrant?: any;
  onChangeChannel?: any;
  onConnectChannel: any;
  onDisconnectChannel: any;
}
export default function Config({
  onChangeQuadrant,
  onChangeCommandChat,
  onChangeChannel,
  onConnectChannel,
  onDisconnectChannel,
  command,
  rangeQuadrant,
  channel
}: Props): ReactElement {
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
        <div className="absolute inset-y-1/3 border-4 border-gray-500 bg-white right-0 w-80 h-96 rounded-l-lg z-10">
          <div className="flex flex-col mx-3">
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
            <div className="mb-2">
              <TInput
                label="Canal"
                key="channelConfig"
                value={channel}
                onChange={onChangeChannel}
              />
            </div>
            <div className="my-2">
              <button
                className="px-4 py-2 font-semibold text-sm bg-indigo-600  text-white border border-slate-300 rounded-md shadow-sm "
                onClick={() => onConnectChannel()}
              >
                Buscar canal
              </button>
              <button
                className="px-4 py-2 font-semibold text-sm bg-red-600  text-white border border-slate-300 rounded-md shadow-sm "
                onClick={() => onDisconnectChannel()}
              >
                Desconectar chat
              </button>
            </div>
            <div>
              <TInput
                label="Comando de chat"
                key="chatConfig"
                value={command}
                onChange={onChangeCommandChat}
              />
            </div>
            <div className="mt-5">
              <TRange
                onChange={onChangeQuadrant}
                label="Numero de pixeles"
                value={rangeQuadrant}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 font-semibold text-sm bg-white dark:bg-slate-700 text-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-slate-400 rounded-md shadow-sm "
                onClick={() => handleApplyPreview()}
              >
                Preview animation
              </button>
            </div>
            <div>
              {showParticle && (
                <ImageParticle
                  item={itemSelected}
                  messages={[]}
                  key={`imagePArticle-previewConfig`}
                  tierId={'51231'}
                  quadrantNumber={rangeQuadrant}
                  command={command}
                  imgUrl={imgUrlPreview}
                  triggerPreview={openPreview}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="absolute inset-y-1/2 right-0 bg-gray-500 hover:bg-gray-400 w-16 h-14 rounded-l-lg cursor-pointer"
        onClick={() => setOpenConfig(true)}
      >
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
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </>
  );
}
