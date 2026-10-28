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
}) {
  const { onSubmit, onFieldChange, onSelectChange } = actions ?? {};
  //handling selects data
  const handleSelected = (field, id) => {
    onSelectChange((prev) => ({ ...prev, [field]: id }));
  };
  //handling input data
  const handleInput = (e) => {
    const { name, value } = e.target;
    onFieldChange((prev) => ({ ...prev, [name]: value }));
  };

  const Icon = trigger?.icon;
  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            size={initiator === "small" ? "icon" : "default"}
            variant={initiator === "small" ? "ghost" : "default"}
            className={`${!initiator ? "w-30 h-11" : ""}`}
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

        <form onSubmit={submit}>
          <div className="flex  flex-col  gap-7 px-3.5">
            {fields?.map((item) => (
              <Input
                className={"h-12"}
                type={item.type}
                placeholder={item.placeholder}
                name={item.name}
                required
                onChange={handleInput}
              ></Input>
            ))}
            {Object.entries(selectFields ?? {}).map(([key, select]) => {
              return (
                <CustomDropDown
                  key={key}
                  placeholder={select.header}
                  item={convertArray(select.data, select.idKey, select.nameKey)}
                  select={(id) => handleSelected(select.idKey, id)}
                />
              );
            })}

            <div className="mt-3.5 flex items-center justify-center">
              <Button
                type="submit"
                variant="secondary"
                className={"w-2xs h-12"}
              >
                {title}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
