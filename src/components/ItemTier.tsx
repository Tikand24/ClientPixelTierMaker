import type { ReactElement } from 'react';
import { useDrag } from 'react-dnd';
import { Item } from '../typings/Item';

interface Props {
  item: Item;
  onSelectItem?: any;
  onRemoveItem?: any;
  itemSelected?: Item | null;
  isInTier: boolean;
}
export default function ItemTier({
  item,
  onSelectItem,
  itemSelected,
  isInTier,
  onRemoveItem,
}: Props): ReactElement {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'itemList',
    item: { _id: item._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const isSelected = itemSelected?._id === item._id;
  return (
    <div
      className={` relative  basis-1/6 border-2 border-sky-500  rounded-md bg-cover bg-center h-20  bg-origin-content ${
        isDragging &&'bg-red-300'
      } ${itemSelected && 'opacity-50'} ${
        isSelected && 'opacity-100'
      } ${!isInTier && 'cursor-pointer'}`}
      style={{
        backgroundImage: `url('${import.meta.env.VITE_URL_BASE_SERVER}/${item.image}')`,
      }}
      onClick={onSelectItem ? () => onSelectItem(item):undefined}
      ref={drag}
    >
      {isInTier ? <div className={`absolute top-0 right-0 ${isInTier && 'cursor-pointer'}`} onClick={()=>onRemoveItem(item)}>x</div> : <></>}
    </div>
  );
}
