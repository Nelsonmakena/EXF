import ServicesItems from "@/Comp/products/servicesitems";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function ProductServiceList({ NewServiceTab }) {
  return (
    <section className=" absolute top-24 z-50 bg-none backdrop-blur-2xl w-full max-h-screen  overflow-hidden">
      <ScrollArea className={"h-screen"}>
        <div className="container-main bg-card">
          <ServicesItems />
        </div>
      </ScrollArea>
    </section>
  );
}
