export interface Template {
  _id: number;
  name: string;
  medias: any[];
  categoryId: string;
  tiers: any[];
}
export interface TemplateResponse {
  data: Template;
}
