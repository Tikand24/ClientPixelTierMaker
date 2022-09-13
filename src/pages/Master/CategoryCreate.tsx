import { ReactElement, useState } from 'react';
import Chip from '../../components/Chip';
import TInput from '../../components/Form/Input/TInput';
import Head from '../../components/Head';
import API from '../../api/api';

interface CategoryCreateState {
  name: string;
  tag: string;
  tags: string[];
}

export default function CategoryCreate(): ReactElement {
  const [name, setName] = useState<CategoryCreateState['name']>('');
  const [tag, setTag] = useState<CategoryCreateState['tag']>('');
  const [tags, setTags] = useState<CategoryCreateState['tags']>([]);
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setTags([...tags, tag]);
      setTag('');
    }
  };
  const removeTag = (tag: string) => {
    const index = tags.indexOf(tag);
    if (index !== -1) {
      const tagsLocal = tags;
      tagsLocal.splice(index, 1);
      setTags([...tags]);
    }
  };
  const handleSaveCategory = () => {
    console.log('guardar');
    API.post(`category/`, {
      name,
      tags,
    })
      .then((response: any) => {
        console.log('responseOk', response);
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <>
      <Head title="Create tier" />
      <div className="md:container md:mx-auto">
        <div className="text-3xl font-bold underline">Create category</div>
        <div className="mt-5">
          <TInput
            label="Nombre"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="mt-5 flex flex-wrap">
          <div>
            <TInput
              label="Tag"
              value={tag}
              onChange={(e: any) => setTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {tags.map((tag) => (
            <Chip tag={tag} removeTag={removeTag} />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap">
          <button
            className="w-full sm:w-auto py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white  text-sm font-semibold rounded-md shadow focus:outline-none cursor-pointer"
            onClick={handleSaveCategory}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}
