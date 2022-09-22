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
import { TIERS } from '../typings/enums/Tier';
import { TemplateResponse } from '../typings/Template';
import UserVoteList from '../components/UserVoteList';
const socket = io(`${import.meta.env.VITE_URL_SOCKET}`);

interface TierPageState {
  itemSelected: Item | null;
  tiers: Array<Tier>;
  items: Array<Item>;
  messages: Message[];
  imageParticleInfo: ImageParticleInfo;
  usersVotes: string[];
  adminMode: boolean;
  firstTime: boolean;
}

export default function CreateTierPage(): ReactElement {
  const { id } = useParams();
  const [adminMode, setAdminMode] = useState<TierPageState['adminMode']>(true);
  const [firstTime, setFirstTime] = useState<TierPageState['firstTime']>(false);
  const [messages, setMessages] = useState<TierPageState['messages']>([]);
  const [usersVotes, setUsersVotes] = useState<TierPageState['usersVotes']>([]);
  const [itemSelected, setItemSelected] =
    useState<TierPageState['itemSelected']>(null);
  const [imageParticleInfo, setImageParticleInfo] = useState<
    TierPageState['imageParticleInfo']
  >({
    messages: [],
    quadrantNumber: 2,
    command: '',
    channel:'',
  });

  const [tiers, setTiers] = useState<TierPageState['tiers']>([]);
  const [items, setItems] = useState<TierPageState['items']>([]);
  const initSocketEvents = (tiersSelected: Array<Tier>) => {
    socket.on('connect', () => {
      console.log('connectedSoket', socket.id);
    });

    socket.on('itemRecive', (data: Item) => {
      try {
        handleSelectedItem(data, false);
      } catch (e) {
        console.log('error', e);
      }
    });
    socket.on('voteReceived', (message: MessageResponse) => {
      try {
        if (!message) return;
        const tierFind = tiersSelected.find((t) => {
          if (message.message) {
            return message.message
              .trim()
              .toLocaleLowerCase()
              .includes(t.name.trim().toLocaleLowerCase());
          }
        });
        if (tierFind) {
          const userVoteFind = usersVotes.find(user=>user===message.username)
          if(!userVoteFind){
            setUsersVotes((usersVotes) => [message.username, ...usersVotes]);
            setMessages(
              messages.concat({
                tier: tierFind,
                message: message.message,
                username: message.username,
              })
            );
          }
        }
      } catch (e) {
        console.log('error', e);
      }
    });
  };
  useEffect(() => {
    socket.connect();
    API.get(`template/${id}`)
      .then((response: TemplateResponse) => {
        if (response.data) {
          setTiers(response.data.tiers);
          setItems(
            response.data.medias.map((media) => ({
              _id: Date.now(),
              name: '',
              image: media,
            }))
          );
          console.log('firstTime',firstTime);
          setFirstTime(true);
          initSocketEvents(response.data.tiers);
        }
      })
      .catch((error) => console.log('error', error));
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
      const indexTier = originTiers.findIndex((tier) => tier._id === data._id);
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
  const handleChangeChannel = (e: any) => {
    setImageParticleInfo({
      ...imageParticleInfo,
      channel: e.target.value,
    });
  };
  const handleSearchChannel = async () => {
    API.get(`config/track-chat/${imageParticleInfo.channel}`)
      .then((response: any) => {
        setUsersVotes([]);
      })
      .catch((error) => console.error('error', error));
  };
  const handleDisconnectChannel = async () => {
    API.get(`config/disconnect-chat`)
      .then((response: any) => {
        setUsersVotes([]);
        setImageParticleInfo({
          ...imageParticleInfo,
          channel: ''
        });
      })
      .catch((error) => console.error('error', error));
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Head title="Tier Create" />
        <div className="md:container md:mx-auto">
          <div className="text-3xl font-bold underline">Create a Tier</div>
          <Config
            command={imageParticleInfo.command}
            channel={imageParticleInfo.channel}
            rangeQuadrant={imageParticleInfo.quadrantNumber}
            onChangeCommandChat={handleChangeCommandChat}
            onChangeQuadrant={handleChangeQuadrant}
            onChangeChannel={handleChangeChannel}
            onConnectChannel={handleSearchChannel}
            onDisconnectChannel={handleDisconnectChannel}
          />
          <UserVoteList messages={usersVotes} />
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
        <div className="bg-orange-300"></div>
        <div className="bg-red-300"></div>
        <div className="bg-amber-300"></div>
        <div className="bg-yellow-300"></div>
        <div className="bg-green-300"></div>
      </DndProvider>
    </>
  );
}
