import { ReactElement, useEffect } from 'react';
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
  onRemoveItem: any;
  imageParticleInfo: ImageParticleInfo;
}
export default function TierSection({
  tier,
  items,
  onRemoveItem,
  itemSelected,
  messages,
  imageParticleInfo,
}: Props): ReactElement {
  useEffect(() => {
    console.log('effect', tier);
  }, [tier]);
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
  return (
    <div className="flex">
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
              tierId={tier.id.toString()}
              quadrantNumber={imageParticleInfo.quadrantNumber}
              command={imageParticleInfo.command}
            />
          ) : (
            'isNotData'
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
      <div className="basis-1/12">
        <div>Icon config</div>
        <div>Icon up</div>
        <div>icun down</div>
      </div>
    </div>
  );
}
