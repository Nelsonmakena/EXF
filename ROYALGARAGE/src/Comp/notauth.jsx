import { Spinner } from "@/components/ui/spinner";

export default function NotAuth() {
  return (
    <>
      <section className="w-full h-screen flex items-center justify-center">
        <Spinner className={"size-7 mr-2.5 "}></Spinner>
        <h1 className="text-destructive font-bold text-4xl flex  items-center ">
          404 <span className="text-primary">Not Authorized</span>
        </h1>
      </section>
    </>
  );
}
