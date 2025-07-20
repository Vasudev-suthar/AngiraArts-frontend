import OurProducts from '@/components/OurProducts'
import { fetchDataFromApi } from '@/utils/api';

export default async function page() {

  const categoriesList = await fetchDataFromApi('/api/category');
  const categories = categoriesList?.categoryList
  return (
    <OurProducts categories={categories} />
  )
}
