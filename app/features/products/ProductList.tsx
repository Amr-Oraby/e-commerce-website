import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";

function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="px-10 sm:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
