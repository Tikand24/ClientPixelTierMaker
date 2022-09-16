import Head from '../components/Head';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import CategoryList from '../components/CategoryList';
import { Category } from '../typings/Category';
import API from '../api/api';

interface AppState {
  categories: Category[];
}

export default function HomePage(): ReactElement {
  const [categories, setCategories] = useState<AppState['categories']>([]);

  useEffect(() => {
    API.get('category').then((response:any)=>{
      setCategories(response.data);
    }).catch(error=>console.log('error',error));
  }, []);

  return (
    <>
      <Head title="Tier Maker" />
      <div className="md:container md:mx-auto">
        <div className="text-3xl font-bold underline">
          Create a Tier List For Anything
        </div>
        <CategoryList categories={categories} />
      </div>
    </>
  );
}
