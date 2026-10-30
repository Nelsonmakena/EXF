import {
  ArrowRight,
  Package,
  TrendingDown,
  Boxes,
  PlusCircleIcon,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { currencyFormat } from "@/utils/utils";
import CustomSheet from "@/Comp/custom-sheet";
import { newStockInputs } from "@/utils/inputs";
export default function InventoryCard({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Card className="group cursor-pointer rounded-xl p-4 transition hover:bg-muted/40">
        <div className="flex items-center gap-4">
          {/* Product icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
            <LazyLoadImage
              src={`/assets/images/${product.product_image}.jpg`}
              alt={product.product_name}
              effect="blur"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{product.product_name} </p>

            <p className="text-sm text-muted-foreground">
              {/* {item.category} */}
            </p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              SKU:
              {/* {item.sku} */}
            </p>
          </div>

          {/* Current stock */}
          <div className="hidden w-24 sm:block">
            <p className="text-xs text-muted-foreground">In stock</p>

            <div className="mt-1 flex items-center gap-1.5">
              <Boxes className="h-4 w-4 text-muted-foreground" />

              <span className="font-semibold">{product.stock}</span>
            </div>
          </div>

          {/* Sold today */}
          <div className="hidden w-28 md:block">
            <p className="text-xs text-muted-foreground">Sold today</p>

            <div className="mt-1 flex items-center gap-1.5">
              <TrendingDown className="h-4 w-4 text-muted-foreground" />

              <span className="font-semibold">{/* {item.soldToday} */}</span>
            </div>
          </div>

          {/* Value */}
          <div className="hidden w-28 lg:block">
            <p className="text-xs text-muted-foreground">Stock value</p>

            <p className="mt-1 font-semibold">
              KSh
              {currencyFormat(product.stockValue)}
            </p>
          </div>
          <div className="w-30">
            <CustomSheet
              title={product.product_name}
              trigger={{ icon: PlusCircleIcon, name: "add stock" }}
              fields={newStockInputs}
            />
          </div>

          {/* Arrow */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
