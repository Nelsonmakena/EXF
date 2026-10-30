import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomDropDown from "./customdropdown";
import { convertArray } from "@/utils/utils";
export default function CustomSheet({
  initiator,
  title,
  trigger,
  fields,
  selectFields,
  actions,
  states,
}) {
  const { onSubmit, onFieldChange, onSelectChange } = actions ?? {};
  const { open, setOpen } = states ?? {};
  const Icon = trigger?.icon;
  //handling selects data
  const handleSelected = (field, id) => {
    onSelectChange((prev) => ({ ...prev, [field]: id }));
  };
  //handling input data
  const handleInput = (e) => {
    const { name, value } = e.target;
    onFieldChange((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size={initiator === "small" ? "icon" : "default"}
            variant={initiator === "small" ? "ghost" : "default"}
            className={`${!initiator ? "w-full h-11 tracking-widest" : ""}`}
          >
            {initiator === "small" ? (
              <Icon />
            ) : (
              <>
                <Icon /> {trigger?.name}
              </>
            )}
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-header heading-normal ">
            {title}
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={submit}
          className="flex  flex-col  h-screen justify-between"
        >
          <div className="flex flex-col gap-normal px-3.5">
            {fields?.map((item, index) => (
              <div key={index} className="grid gap-1 ">
                <label> {item.label}</label>
                <Input
                  className={"h-11"}
                  type={item.type}
                  placeholder={item.label}
                  name={item.name}
                  value={item.value}
                  required
                  onChange={handleInput}
                ></Input>
              </div>
            ))}
            {Object.entries(selectFields ?? {}).map(([key, select]) => {
              return (
                <div key={key}>
                  <label> {select.header}</label>
                  <CustomDropDown
                    placeholder={select.header}
                    item={convertArray(
                      select.data,
                      select.idKey,
                      select.nameKey,
                    )}
                    select={(id) => handleSelected(select.idKey, id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center py-3">
            <Button type="submit" variant="secondary" className={"w-2xs h-12"}>
              {trigger.name}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
