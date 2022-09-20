import Template from './Template';
export interface Category {
  _id: number;
  name: string;
  tags: string[];
  templates: Template[];
}
