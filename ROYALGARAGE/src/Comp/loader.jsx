import { Spinner } from "@/components/ui/spinner";

export default function Loader() {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Spinner className="size-4"></Spinner>
    </section>
  );
}
