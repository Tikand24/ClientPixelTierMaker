import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Head from '../components/Head';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { Tier } from '../typings/Tier';
import TierSection from '../components/TierSection';
import { Item } from '../typings/Item';
import ItemTier from '../components/ItemTier';
import VoteItem from '../components/VoteItem';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { io } from 'socket.io-client';
import { Message, MessageResponse } from '../typings/Message';
import Config from '../components/Config/Config';
import { ImageParticleInfo } from '../typings/ImageParticleInfo';
const socket = io(`${import.meta.env.VITE_URL_SOCKET}`);

interface TierPageState {
  itemSelected: Item | null;
  tiers: Array<Tier>;
  items: Array<Item>;
  messages: Message[];
  imageParticleInfo: ImageParticleInfo;
  usersVotes: string[];
  adminMode: boolean;
}

export default function CreateTierPage(): ReactElement {
  const { id } = useParams();
  const [adminMode, setAdminMode] = useState<TierPageState['adminMode']>(true);
  const [messages, setMessages] = useState<TierPageState['messages']>([]);
  const [itemSelected, setItemSelected] =
    useState<TierPageState['itemSelected']>(null);
  const [imageParticleInfo, setImageParticleInfo] = useState<
    TierPageState['imageParticleInfo']
  >({
    messages: [],
    quadrantNumber: 2,
    command: '',
  });

  const [tiers, setTiers] = useState<TierPageState['tiers']>([
    { id: 1, name: 'S', order: 1, color: 'red-300', itemSelected: [] },
    { id: 2, name: 'A', order: 1, color: 'orange-300', itemSelected: [] },
    { id: 3, name: 'B', order: 1, color: 'amber-300', itemSelected: [] },
    { id: 4, name: 'C', order: 1, color: 'yellow-300', itemSelected: [] },
    { id: 5, name: 'D', order: 1, color: 'green-300', itemSelected: [] },
  ]);
  const [items, setItems] = useState<TierPageState['items']>([]);

  useEffect(() => {
    API.get(`items/tier/${id}`)
      .then((response: any) => {
        setItems(response.data.data);
        console.log('responseAny', response);
        socket.connect();
        console.log('connected', id, socket.connected);
      })
      .catch((error) => console.log('error', error));

    socket.on('connect', () => {
      console.log('connectedSoket', socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('itemRecive', (datta: Item) => {
      try {
        console.log('itemRecive', datta);
        handleSelectedItem(datta, false);
      } catch (e) {
        console.log('error', e);
      }
    });
    socket.on('voteReceived', (message: MessageResponse) => {
      try {
        if (!message) return;
        const tierFind = tiers.find((t) => {
          if (message.message) {
            return message.message
              .trim()
              .toLocaleLowerCase()
              .includes(t.name.trim().toLocaleLowerCase());
          }
        });
        if (tierFind) {
          setMessages(
            messages.concat({
              tier: tierFind,
              message: message.message,
              username: message.username,
            })
          );
        }
      } catch (e) {
        console.log('error', e);
      }
    });
  }, []);

  const handleSelectedItem = (data: Item, sendEmitData = true) => {
    if (sendEmitData) {
    }
    if (data._id === itemSelected?._id) {
      setItemSelected(null);
    } else {
      setItemSelected(data);
    }
  };
  const handleSelectedTier = (data: Tier | null) => {
    if (!data) return;
    let originTiers = tiers;
    if (itemSelected) {
      originTiers = handleRemoveItemTier(itemSelected);
      const indexTier = originTiers.findIndex((tier) => tier.id === data.id);
      if (indexTier != -1) {
        const modifyTier = originTiers[indexTier];
        const findItemTier = modifyTier.itemSelected.find(
          (item) => item._id === itemSelected._id
        );
        if (!findItemTier) {
          modifyTier.itemSelected.push(itemSelected);
        }
        originTiers.splice(indexTier, 1, modifyTier);
      }
      setTiers([...originTiers]);
    }
    setItemSelected(null);
  };
  const handleRemoveItemTier = (item: Item): Tier[] => {
    const originTiers = tiers;
    const itemFindInTier = originTiers.find((tier) =>
      tier.itemSelected.find((itemSelected) => itemSelected._id === item._id)
    );
    if (itemFindInTier) {
      const indexFind = itemFindInTier.itemSelected.findIndex(
        (item) => item._id === item._id
      );
      if (indexFind !== -1) {
        itemFindInTier.itemSelected.splice(indexFind, 1);
      }
    }

    setTiers([...originTiers]);
    return originTiers;
  };

  const handleChangeCommandChat = (e: any) => {
    setImageParticleInfo({
      ...imageParticleInfo,
      command: e.target.value,
    });
  };

  const handleChangeQuadrant = (e: any) => {
    setImageParticleInfo({
      ...imageParticleInfo,
      quadrantNumber: parseInt(e.target.value),
    });
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Head title="Tier Create" />
        <div className="md:container md:mx-auto">
          <div className="text-3xl font-bold underline">Create a Tier</div>
          <Config
            command={imageParticleInfo.command}
            rangeQuadrant={imageParticleInfo.quadrantNumber}
            onChangeCommandChat={handleChangeCommandChat}
            onChangeQuadrant={handleChangeQuadrant}
          />
          {tiers.map((tier) => {
            return (
              <TierSection
                key={`TierSection-${tier.name}`}
                tier={tier}
                items={items}
                itemSelected={itemSelected}
                messages={messages}
                imageParticleInfo={imageParticleInfo}
                onRemoveItem={handleRemoveItemTier}
              />
            );
          })}
          <button
            onClick={() => setAdminMode(!adminMode)}
            className="px-4 py-2 mt-4 font-semibold text-sm bg-cyan-500 text-white rounded shadow-sm"
          >
            AdminMode {`${adminMode}`}
          </button>
          <div className="flex flex-wrap">
            {adminMode
              ? items.map((item, index) => {
                  return (
                    <ItemTier
                      key={`ItemTier-${item.name}${index}`}
                      item={item}
                      itemSelected={itemSelected}
                      onSelectItem={handleSelectedItem}
                      isInTier={false}
                    />
                  );
                })
              : itemSelected && (
                  <ItemTier
                    key={`ItemTier-${itemSelected.name}selected`}
                    item={itemSelected}
                    itemSelected={itemSelected}
                    isInTier={false}
                  />
                )}
          </div>
          <VoteItem
            item={itemSelected}
            tiers={tiers}
            onSelectedTier={handleSelectedTier}
          />
        </div>
      </DndProvider>
    </>
  );
}
