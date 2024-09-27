'use client';
import React, { useEffect, useState } from 'react';
import ListProducts from "@/components/Home/List";
import {Button} from "@nextui-org/react";
import axios from 'axios';
import {Select, SelectItem} from "@nextui-org/select";
import { api } from '@/constant/api';

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [selectCategory, setSelectCategory] = useState('');
  const [selectPrice, setSelectPrice] = useState('');

  const submitFilter = async () => {
    await axios.get(`${api.listProduct}/category${selectCategory.currentKey ? `/${selectCategory.currentKey}` : ''}${selectPrice.currentKey ? `/${selectPrice.currentKey}` : ''}`).then(res => {
      setProducts(res.data.products)
    })
  };

  const fetchListProducts = async () => {
    await axios.get(`${api.listProduct}`).then(res => {
      setProducts(res.data.products)
    })
  };

  const fetchListCategory = async () => {
    await axios.get(`${api.listProduct}/category-list`).then(res => {
      setCategory(res.data)
    })
  };

  const prices = [
    {key: "asc", label: "Murah ke mahal"},
    {key: "desc", label: "Mahal ke Murah"}
  ];

  useEffect(() => {
    fetchListProducts();
    fetchListCategory();
  }, []);

  return (
    <>
      <form>
        <div className="grid grid-cols-3 gap-4 my-3">
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
          <div className="pt-7">
            <Button className="rounded h-9 ml-3 px-5 text-white bg-[#95a7b3]" onClick={() => submitFilter()}>
              Search
            </Button>
          </div>
        </div>
      </form>
      <div className='mt-4'>
        <div className='grid grid-cols-4 gap-4'>
          {products?.length !== 0 ? (
            <>
              {products?.map((item: any, idx) => (
                <ListProducts key={idx} {...item} />
              ))}
            </>
          ) : (
            <p className='text-center py-5'>
              No Data
            </p>
          )}
        </div>
      </div>
    </>
  );
}
