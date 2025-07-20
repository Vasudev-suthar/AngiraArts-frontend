import FeaturedProducts from '@/components/FeaturedProducts'
import { fetchDataFromApi } from '@/utils/api';
import React from 'react'

export default async function page() {

  const featuredProducts = await fetchDataFromApi('/api/products/featured');
  return (
    <FeaturedProducts featuredProducts={featuredProducts} />
  )
}
