import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Package, TrendingDown, Boxes } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { currencyFormat } from "@/utils/utils";
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button>add stock</Button>} />
            <SheetContent className={"bg-none backdrop-blur-2xl"}>
              <SheetHeader>
                <SheetTitle className={"text-header heading-normal"}>
                  {product.product_name}
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <form>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3"></div>
                </div>
                <div className="card flex flex-col gap-2.5 justify-center">
                  <Button type="submit" className="  w-full h-11">
                    add
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>

          {/* Arrow */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
