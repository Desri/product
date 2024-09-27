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
            <b>{props.title}</b>
            <p className="text-default-500">${props.price}</p>
          </div>
          <div className='mt-3'>
            <p>
              {props.description}
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default ListProducts;
