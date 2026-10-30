import CustomSheet from "@/Comp/custom-sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceCategories } from "@/store/serviceslice";
import { editCategoryInputs } from "@/utils/inputs";
import { AvatarFormatter } from "@/utils/utils";
import { ArrowRight, SquarePen } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ServiceCategories() {
  const dispatch = useDispatch();
  const { serviceCategories } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(getServiceCategories());
  }, []);

  return (
    <section className="section-sm flex flex-col gap-normal">
      {serviceCategories?.map((item) => (
        <Card className="group cursor-pointer rounded-xl p-4 transition hover:bg-muted/40">
          <div className="flex items-center gap-4">
            {/* Product icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ">
              {AvatarFormatter(item.category_name, "")}
            </div>
            {/* Product */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{item.category_name}</p>

              <p className="text-sm text-muted-foreground">
                {/* {item.category} */}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                SKU:
                {/* {item.sku} */}
              </p>
            </div>

            <div className="hidden w-24 sm:block">
              <p className="text-xs text-muted-foreground">jobs in progress</p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-semibold">{/* {product.stock} */}</span>
              </div>
            </div>

            <div className="hidden w-28 md:block">
              <p className="text-xs text-muted-foreground">jobs completed</p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-semibold">{/* {item.soldToday} */}</span>
              </div>
            </div>
            <div>
              <CustomSheet
                title={item.category_name}
                initiator={"small"}
                trigger={{ icon: SquarePen, name: "update" }}
                fields={editCategoryInputs}
              />
            </div>

            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </Card>
      ))}
    </section>
  );
}
