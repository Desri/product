'use client';
import React, { useEffect, useState } from 'react';
import ListProducts from "@/components/Home/List";
import {Button} from "@nextui-org/react";
import axios from 'axios';
import {Select, SelectItem} from "@nextui-org/select";
import { api } from '@/constant/api';
import NoData from '../NoData';

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [limit, setLimit] = useState(10);
  const [nextPage, setNextPage] = useState(10);

  const [selectCategory, setSelectCategory] = useState('');
  const [selectPrice, setSelectPrice] = useState('');

  const submitFilter = async () => {
    await axios.get(`${api.listProduct}/category${selectCategory.currentKey ? `/${selectCategory.currentKey}` : ''}${selectPrice.currentKey ? `/${selectPrice.currentKey}` : ''}`).then(res => {
      setProducts(res.data.products)
    })
  };

  const fetchListProducts = async () => {
    await axios.get(`${api.listProduct}?limit=${limit}`).then(res => {
      setProducts(res.data.products)
    })
  };

  const fetchListCategory = async () => {
    await axios.get(`${api.listProduct}/category-list`).then(res => {
      setCategory(res.data)
    })
  };

  const loadMore = async () => {
    setNextPage(nextPage + 10);
    await axios.get(`${api.listProduct}?limit=${limit}&skip=${nextPage}`).then(res => {
      setProducts([...products, ...res.data.products])
    })
  };

  const prices = [
    {key: "asc", label: "Murah ke Mahal"},
    {key: "desc", label: "Mahal ke Murah"}
  ];

  useEffect(() => {
    fetchListProducts();
    fetchListCategory();
  }, []);

  return (
    <>
      <form>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-3">
          <div>
            <label className="font-bold text-sm">Category</label>
            <Select
              size="sm"
              label="Select category" 
              className="max-w-xs"
              selectedKeys={selectCategory}
              onSelectionChange={setSelectCategory}
            >
              {category.map((item) => (
                <SelectItem key={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <label className="font-bold text-sm">Price</label>
            <Select 
              size="sm"
              label="Select price" 
              className="max-w-xs"
              selectedKeys={selectPrice}
              onSelectionChange={setSelectPrice}
            >
              {prices.map((price) => (
                <SelectItem key={price.key}>
                  {price.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="sm:pt-7">
            <Button className="rounded h-9 sm:ml-3 px-5 text-white bg-[#95a7b3]" onClick={() => submitFilter()}>
              Search
            </Button>
          </div>
        </div>
      </form>
      <div className='mt-8'>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
          {products?.length !== 0 ? (
            <>
              {products?.map((item: any, idx) => (
                <ListProducts key={idx} {...item} />
              ))}
            </>
          ) : (
            <NoData />
          )}
        </div>
        {products?.length !== 0 &&
          <Button className="rounded h-9 w-full mt-8 bg-[#4589c3] text-white" onClick={() => loadMore()}>
            More Products
          </Button>
        }
      </div>
    </>
  );
}
