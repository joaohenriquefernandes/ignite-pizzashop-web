import { api } from '@/lib/axios';

interface IUpdateProfileBody {
  name: string;
  description: string | null;
}

export async function UpdateProfile({ description, name }: IUpdateProfileBody) {
  const response = await api.put('profile', {
    name,
    description,
  });

  return response.data;
}
