import { useNavigate } from 'react-router-dom';
import { Template } from '../typings/Template';

interface Props {
  template: Template;
}
export default function TemplatePreview({ template }: Props) {
  const navigate = useNavigate();
  const image = template.medias.length > 0 ?template.medias[0]:'';
  console.log('click',image);
  function onClick(): void {
    window.scrollTo(0, 0);
    navigate(`${template._id}`);
  }

  return (
    <div>
      <div
      role='button'
        onClick={onClick}
        className="grid content-end  justify-items-stretch bg-cover bg-center w-36 h-36 border-2 shadow-xl mx-1 hover:bg-gray-200"
        style={{
          backgroundImage: `url('${import.meta.env.VITE_URL_BASE_SERVER}/${image}')`,
        }}
      >
        <div className="bg-black text-white text-center"> {template.name} </div>
      </div>
    </div>
  );
}
