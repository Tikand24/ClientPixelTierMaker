import { ReactElement, useEffect, useState } from 'react';
import TInput from '../../components/Form/Input/TInput';
import TSelect from '../../components/Form/Select/TSelect';
import Head from '../../components/Head';
import API from '../../api/api';
import { Tier } from '../../typings/Tier';
import { SelectOptions } from '../../typings/Form';
import TierSection from '../../components/TierSection';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TFile from '../../components/Form/File/TFile';
interface TemplateCreateState {
  name: string;
  nameTier: string;
  order: number;
  categories: SelectOptions[];
  colors: SelectOptions[];
  category: string | undefined;
  color: string | undefined;
  tiers: Array<Tier>;
  images: Array<any>;
}

export default function TemplateCreate(): ReactElement {
  const [name, setName] = useState<TemplateCreateState['name']>('');
  const [images, setImages] = useState<TemplateCreateState['images']>([]);
  const [nameTier, setNameTier] = useState<TemplateCreateState['nameTier']>('');
  const [categories, setCategories] = useState<
    TemplateCreateState['categories']
  >([]);
  const [category, setCategory] =
    useState<TemplateCreateState['category']>(undefined);
  const [color, setColor] = useState<TemplateCreateState['color']>(undefined);
  const [colors, setColors] = useState<TemplateCreateState['colors']>([
    { value: 'orange-300', description: 'orange-300' },
    { value: 'red-300', description: 'red-300' },
    { value: 'amber-300', description: 'amber-300' },
    { value: 'yellow-300', description: 'yellow-300' },
    { value: 'green-300', description: 'green-300' },
  ]);
  const [tiers, setTiers] = useState<TemplateCreateState['tiers']>([]);
  const [order, setOrder] = useState<TemplateCreateState['order']>(0);

  useEffect(() => {
    API.get('category')
      .then((response: any) => {
        setCategories(
          response.data.data.map((category: any) => ({
            value: category._id,
            description: category.name,
          }))
        );
      })
      .catch((error) => console.log('error', error));
  }, []);
  const handleAddTier = () => {
    const tier: Tier = {
      id: Date.now(),
      name: nameTier,
      order,
      color: color ? color : '',
      itemSelected: [],
    };
    setTiers([...tiers, tier]);
    setNameTier('');
    setOrder(order + 1);
    setColor(undefined);
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Head title="Create template" />
        <div className="md:container md:mx-auto">
          <div className="text-3xl font-bold underline">Crear template</div>

          <div className="mt-5 flex flex-row">
            <div className="basis-1/4">
              <TSelect
                label="Categoria"
                value={category}
                options={categories}
                onChange={(e: any) => setCategory(e.target.value)}
              />
            </div>
            <div className="basis-1/4">
              <TInput
                label="Nombre"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
            <div className="basis-1/4">
              <TFile
                label="imagenes"
                onChange={(e: any) => setImages(e.target.value)}
                value={images}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-row">
            <div className="basis-1/4">
              <div className="text-3lg font-bold">Tier</div>
            </div>
          </div>

          <div className="mt-5 flex flex-row">
            <div className="basis-1/4">
              <TInput
                label="Nombre Tier"
                value={nameTier}
                onChange={(e: any) => setNameTier(e.target.value)}
              />
            </div>
            <div className="basis-1/4">
              <TSelect
                label="Color"
                value={color}
                options={colors}
                onChange={(e: any) => setColor(e.target.value)}
              />
            </div>
            <div className="basis-1/4">
              <TInput
                label="Orden"
                value={order}
                onChange={(e: any) => setName(e.target.value)}
              />
            </div>
            <div className="basis-1/4">
              <button
                className="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white  text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer"
                onClick={handleAddTier}
              >
                Agregar tier
              </button>
            </div>
          </div>
          <div className="mt-5 flex flex-row">
            <div className="basis-1/4">
              <div className="text-3lg font-bold">Previsualizacion</div>
            </div>
          </div>
          <div className="mt-5">
            {tiers.map((tier) => {
              return (
                <div className="flex flex-row">
                  <div className="basis-1/12 flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                  <div className="basis-11/12">
                    <TierSection
                      key={`TierSection-${tier.name}`}
                      tier={tier}
                      items={[]}
                      itemSelected={null}
                      messages={[]}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-orange-300"></div>
          <div className="bg-red-300"></div>
          <div className="bg-amber-300"></div>
          <div className="bg-yellow-300"></div>
          <div className="bg-green-300"></div>
        </div>
      </DndProvider>
    </>
  );
}
