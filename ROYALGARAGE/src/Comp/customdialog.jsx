import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomDropDown from "./customdropdown";
import { convertArray } from "@/utils/utils";
export default function CustomDialog({
  initiator,
  title,
  trigger,
  fields,
  selectFields,
  actions,
  states,
}) {
  const { onSubmit, onFieldChange, onSelectChange } = actions ?? {};
  const { open, setOpen, inputs } = states ?? {};

  const Icon = trigger?.icon;
  const handleSelected = (field, id) => {
    onSelectChange((prev) => ({ ...prev, [field]: id }));
  };
  //handling input data
  const handleInput = (e, item) => {
    const { name, value } = e.target;

    onFieldChange((prev) => ({
      ...prev,
      [name]: item.format ? item.format(value) : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
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
      ></DialogTrigger>
      <DialogContent className={"bg-card"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="flex flex-col gap-normal px-3.5">
            {fields?.map((item, index) => (
              <div key={index} className="grid gap-1 ">
                <label className="capitalize"> {item.label}</label>
                <Input
                  className={"h-11"}
                  type={item.type}
                  placeholder={item.label}
                  name={item.name}
                  value={inputs?.[item.name] ?? ""}
                  maxlength={item?.maxLength}
                  required
                  onChange={(e) => handleInput(e, item)}
                ></Input>
              </div>
            ))}
            {Object.entries(selectFields ?? {}).map(([key, select]) => {
              return (
                <div key={key}>
                  <label className="tracking-wide "> {select.header}</label>
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
      </DialogContent>
    </Dialog>
  );
}
