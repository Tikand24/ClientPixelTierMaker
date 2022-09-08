import { useNavigate } from 'react-router-dom';
import { Template } from '../typings/Template';

interface Props {
  template: Template;
}
export default function TemplatePreview({ template }: Props) {
  const navigate = useNavigate();
  function onClick(): void {
    console.log('click',template);
    window.scrollTo(0, 0);
    navigate(`${template._id}`);
  }

  return (
    <div>
      <div
      role='button'
        onClick={onClick}
        className="grid content-end  justify-items-stretch bg-cover bg-center w-36 h-36 border-2 border-slate-200 mx-1 hover:bg-sky-700 "
        style={{
          backgroundImage: `url('${import.meta.env.VITE_URL_BASE_SERVER}/${template.image}')`,
        }}
      >
        <div className="bg-black text-white text-center"> {template.name} </div>
      </div>
    </div>
  );
}
