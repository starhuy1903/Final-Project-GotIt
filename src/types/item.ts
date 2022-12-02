export type Author = {
    id: number;
    name: string;
}

export type Item = {
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  categoryId: number;
  author: Author;
};

export type ItemPayload = {
  description: string;
  imageUrl: string;
};
