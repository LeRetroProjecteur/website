import clsx from "clsx";
import { omit, padStart } from "lodash-es";
import ReactSlider from "react-slider";

import { CalendrierStore } from "@/lib/calendrier-store";

export default function TimeSlider({
  useCalendrierStore,
}: {
  useCalendrierStore: CalendrierStore;
}) {
  const minHour = useCalendrierStore((s) => s.minHour);
  const maxHour = useCalendrierStore((s) => s.maxHour);
  const setMinHour = useCalendrierStore((s) => s.setMinHour);
  const setMaxHour = useCalendrierStore((s) => s.setMaxHour);

  const onChange = ([newMinHour, newMaxHour]: [number, number]) => {
    setMinHour(newMinHour);
    setMaxHour(newMaxHour);
  };

  return (
    <div className="flex flex-col grow justify-between pt-3 lg:pt-7 lg:text-xl">
      <div className="flex">
        <div className="pb-3 font-medium uppercase">Horaires :&nbsp;</div>
        <div className="flex grow justify-between">
          <div className="relative left-0 font-medium uppercase">{`de ${padStart(
            String(minHour),
            2,
            "0",
          )}h`}</div>
          <div className="relative right-0 font-medium uppercase">{`à ${padStart(
            String(maxHour),
            2,
            "0",
          )}h`}</div>
        </div>
      </div>
      <div className="flex relative">
        <div className="absolute flex grow border-t w-full bottom-0" />
        <div className="flex grow px-2">
          <ReactSlider
            className="grow"
            renderThumb={(props) => (
              <div
                key={props.key}
                {...omit(props, "key")}
                className="bottom-[-5.5px] outline-none"
              >
                <Thumb />
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                key={props.key}
                {...omit(props, "key")}
                className={clsx("bottom-0 border-t", {
                  "border-dashed": state.index === 1,
                  "z-99": state.index == 1,
                })}
              />
            )}
            value={[minHour, maxHour]}
            max={24}
            min={0}
            minDistance={1}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function Thumb() {
  return (
    <svg
      className="h-[13px] w-[13px] fill-retro-gray"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="6.5" r="6.5" />
    </svg>
  );
}
