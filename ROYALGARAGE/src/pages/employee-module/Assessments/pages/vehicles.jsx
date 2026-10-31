import { AvatarFormatter } from "@/utils/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Vehicle() {
  return (
    <section className="section-sm ">
      <Card className="group cursor-pointer rounded-xl p-4 transition hover:bg-muted/40">
        <div className="flex items-center gap-4">
          {/* avartar  */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
            {AvatarFormatter("K", "")}
          </div>

          {/* vehicle details */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium"></p>

            <p className="text-sm text-muted-foreground"></p>

            <p className="mt-0.5 text-xs text-muted-foreground">SKU:</p>
          </div>

          {/* Value */}
          <div className="hidden w-28 lg:block">
            <p className="text-xs text-muted-foreground">Services</p>

            <p className="mt-1 font-semibold"></p>
          </div>

          {/* Arrow */}
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Card>
    </section>
  );
}
