import React from "react";
import Image from "next/image";
import { Product } from "shopify-buy";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  // variantsから価格に関する情報を取得する
  const { variants } = product;

  // variantsを昇順で並び替え
  variants.sort((a, b) => {
    const [priceA, priceB]: number[] = [a.price, b.price].map((str) =>
      Number(str)
    );
    if (priceA > priceB) return 1;
    if (priceA < priceB) return -1;
    return 0;
  });

  // 一番低い価格・価格に差異があるかを取得
  const price: number = Number(variants[0].price);
  const priceVaries: boolean =
    variants[0].price !== variants[variants.length - 1].price;

  return (
    <div className="product-card">
      <div className="product-card__inner">
        <figure className="product-card__image" style={{ margin: 0 }}>
          <Image
            priority
            src={product.images[0].src}
            height={400}
            width={400}
          />
        </figure>
        <div className="product-card__info mt-2" style={{ textAlign: "left" }}>
          <div className="product-card__title font-semibold text-sm md:text-base">
            {product.title}
          </div>
          <div className="product-card__price  font-semibold text-sm">
            ¥{price.toLocaleString("ja-JP")}
            {priceVaries && "から"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
