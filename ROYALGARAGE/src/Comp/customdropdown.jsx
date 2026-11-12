import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function CustomDropDown({ item, select, placeholder, value }) {
  const defaultValue = item.find((d) => d.id === value);
  return (
    <Select
      defaultValue={defaultValue?.name}
      onValueChange={(value) => {
        const selected = item.find((u) => u.name === value);
        select(selected.id);
      }}
    >
      <SelectTrigger className={"w-full"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={"w-(--anchor-width) bg-card "}>
        {item?.map((item) => (
          <SelectItem
            key={item.id}
            value={item.name}
            className="w-full h-fit py-2 tracking-wider"
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
