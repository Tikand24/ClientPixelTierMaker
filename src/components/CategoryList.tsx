import { Category } from '../typings/Category';
import TemplatePreview from './TemplatePreview';

interface Props {
  categories: Array<Category>;
}
export default function CategoryList({ categories }: Props) {
  return (
    <div className="my-5">
      {categories.map((category) => {
        return (
          <div className="py-5" key={`Category-${category.name}`}>
            <div className="font-bold text-xl">
              Featured <span className="text-sky-600">{category.name}</span>{' '}
              templates
            </div>
            <div  className="flex">
              {category.templates.map((template) => 
              {
                return (<TemplatePreview key={`TemplatePreview-${template.name}`} template={template} />)
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
