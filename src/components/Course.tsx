import { Item } from "../../pages/refactor";

type Props = {
  course: string;
  items: Item[];
  chosenItems: Item[];
  selectAll: (checked: boolean) => void;
  itemChanged: (item: Item, checked: boolean) => void;
};

export function Course({
  course,
  items,
  chosenItems,
  selectAll,
  itemChanged,
}: Props) {
  return (
    <div key={course} className="mb-4">
      <p className="font-semibold mb-1 capitalize">{course}</p>
      <div className="border border-b border-gray-200 mb-2"></div>

      <div className="flex flex-col">
        <label>
          <input
            type="checkbox"
            name={`${course}-select-all`}
            className="mb-2"
            checked={items.length === chosenItems.length}
            onChange={(e) => selectAll(e.target.checked)}
          />
          Select All
        </label>

        {items.map((item) => {
          return (
            <label key={item.name} className="capitalize">
              <input
                type="checkbox"
                name={`${course}-${item.name}`}
                className="mb-2"
                readOnly
                checked={chosenItems.some((i) => i.name === item.name)}
                onChange={(e) => itemChanged(item, e.target.checked)}
              />
              {item.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
