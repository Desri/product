'use client';
import React from 'react';
import { DetailListProducts } from "@/constant/products";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const ListProducts = (props: DetailListProducts) => {
  return (
    <>
      <Card shadow="sm" className='box-product'>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            width="100%"
            alt={props.title}
            className="w-full object-cover h-[140px]"
            src={props.thumbnail}
          />
        </CardBody>
        <CardFooter className="text-small block">
          <div>
            <h2 className='w-[140px] md:w-[115px] xl:w-[165px] font-medium truncate ...'>{props.title}</h2>
            <p className="text-default-500">${props.price}</p>
          </div>
          <div className='mt-3'>
            <p className='description text-ellipsis overflow-hidden'>
              {props.description}
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default ListProducts;
