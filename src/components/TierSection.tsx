import { ReactElement, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ImageParticleInfo } from '../typings/ImageParticleInfo';
import { Item } from '../typings/Item';
import { Message } from '../typings/Message';
import { Tier } from '../typings/Tier';
import ImageParticle from './ImageParticle/ImageParticle';
import ItemTier from './ItemTier';

interface Props {
  tier: Tier;
  items: Item[];
  itemSelected: Item | null;
  messages: Message[];
  onRemoveItem?: any;
  totalVotes: number;
  imageParticleInfo?: ImageParticleInfo;
}
export default function TierSection({
  tier,
  items,
  onRemoveItem,
  itemSelected,
  messages,
  totalVotes,
  imageParticleInfo,
}: Props): ReactElement {
  const [votes, setVotes] = useState(0);
  useEffect(() => {
    const selected: number | null =
      messages.length > 0 ? messages[0].tier._id : null;
    if (selected) {
      if (selected == tier._id) {
        setVotes(votes + 1);
      }
    }
  }, [messages]);
  useEffect(() => {}, [tier]);
  const color = `bg-${tier.color}`;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'itemList',
    drop: (item: any) => addItemToTier(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const addItemToTier = (id: any) => {
    const findOnSelected = tier.itemSelected.find((item) => item._id == id);
    if (!findOnSelected) {
      const find = items.find((item) => item._id == id);
      if (find) {
        tier.itemSelected.push(find);
      }
    }
  };
  const formatPercentage = (value: number): string => {
    if (isNaN(Number(value)) || !isFinite(Number(value))) {
      return '';
    }
    const percentage = Number(value).toString().split('.');
    return percentage.length > 1
      ? `${percentage[0]}.${percentage[1].substring(0, 2)}`
      : percentage[0];
  };
  return (
    <div className="flex h-[130px]">
      <div className={`basis-1/12 flex justify-center items-center ${color}`}>
        {tier.name}
      </div>
      <div
        className="basis-10/12 bg-neutral-400 border border-stone-50"
        ref={drop}
      >
        <div className="flex flex-wrap">
          {itemSelected ? (
            <ImageParticle
              item={itemSelected}
              messages={messages}
              key={`imagePArticle-${tier.name}`}
              tierId={tier._id.toString()}
              quadrantNumber={
                imageParticleInfo ? imageParticleInfo.quadrantNumber : 0
              }
              command={imageParticleInfo ? imageParticleInfo.command : ''}
            />
          ) : (
            ''
          )}
          {tier.itemSelected.map((item) => {
            return (
              <ItemTier
                key={`ItemTier-${item.name}`}
                item={item}
                isInTier={true}
                onRemoveItem={onRemoveItem}
              />
            );
          })}
        </div>
      </div>
      <div
        className="basis-1/12 flex justify-center items-center
       bg-neutral-100 border border-stone-50 text-lg font-bold 
       slashed-zero text-green-500"
      >
        {formatPercentage((votes * 100) / totalVotes)} %
      </div>
    </div>
  );
}
