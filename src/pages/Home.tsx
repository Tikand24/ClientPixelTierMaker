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
    API.get('category')
      .then((response: any) => {
        if (response.data) {
          setCategories(response.data);
        }
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      <Head title="Tier Maker" />
      <div className="">
        <div className="text-5xl font-bold">
          Create a Tier List For Anything
        </div>
        <div className="pt-8 text-lg leading-loose tracking-wide">
          A tier list is a ranking system that allows you to rank anything in
          tiers from the best to worst. Using a tier list allows you to group
          similar ranked items together and it’s quick and easy to create a tier
          list.
        </div>
        <div className="pt-12">
          <CategoryList categories={categories} />
        </div>
      </div>
    </>
  );
}
