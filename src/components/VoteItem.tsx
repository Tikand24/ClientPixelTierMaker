import { ReactElement, useState } from 'react';
import { Item } from '../typings/Item';
import { Tier } from '../typings/Tier';

interface Props {
  item: Item | null;
  tiers: Tier[];
  onSelectedTier: any;
}
interface TierPageState {
  tiers: Tier | null;
}

export default function VoteItem({
  item,
  tiers,
  onSelectedTier,
}: Props): ReactElement {
  const [tierSelected, setTierSelected] =
    useState<TierPageState['tiers']>(null);
  if (!item) {
    return <></>;
  }
  return (
    <>
      <div className="container mt-4 ">
        <div className="flex flex-row justify-center mt-4 ">
          {tiers.map((tier) => (
            <div
              key={`voteItem${tier.id}`}
              className={`border-2 border-sky-500 w-16 h-16 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-100  bg-${
                tier.color
              } ${tierSelected?.id == tier.id ? 'opacity-100' : 'opacity-50'} `}
              onClick={() => setTierSelected(tier)}
            >
              {tier.name}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center ">
          <button
            onClick={() => onSelectedTier(tierSelected)}
            className="px-4 py-2 mt-4 font-semibold text-sm bg-cyan-500 text-white rounded shadow-sm"
          >
            VoteHere
          </button>
        </div>
      </div>
    </>
  );
}
