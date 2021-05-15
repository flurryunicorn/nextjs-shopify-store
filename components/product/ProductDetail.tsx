import React from "react";
import { Product, ProductVariant } from "shopify-buy";
import sanitizeHtml from "sanitize-html";
import getPriceInfoFromProduct from "lib/getPriceInfoFromProduct";
import ProductForm from "components/product/ProductForm";

type Props = {
  product: Product;
  variant: ProductVariant | null;
};

const ProductDetail: React.FC<Props> = ({ product, variant }) => {
  const { title, descriptionHtml } = product;
  const { price } = getPriceInfoFromProduct(product);

  return (
    <>
      <div className="title mb-2">
        <h1 className="font-bold md:font-semibold md:leading-tight text-gray-800 md:text-4xl text-3xl tracking-wide">
          {title}
        </h1>
      </div>
      <div className="price mb-7">
        <span className="font-semibold tracking-wider">
          ¥{price.toLocaleString("ja-JP")}
        </span>
      </div>
      <div className="form mb-24">
        <ProductForm
          product={product}
          variant={variant}
        />
      </div>

      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptionHtml) }}
      />
    </>
  );
};

export default ProductDetail;
