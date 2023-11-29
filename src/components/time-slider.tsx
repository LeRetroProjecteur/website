import classnames from "classnames";
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
    <div className="flex grow">
      <div className="border-retro-gray w-16 border-t"></div>
      <ReactSlider
        className="h-[8px] grow"
        renderThumb={(props) => (
          <div
            key={props.key}
            {...omit(props, "key")}
            className="bottom-[1px] outline-none"
          >
            <Thumb />
          </div>
        )}
        renderTrack={(props, state) => (
          <div
            key={props.key}
            {...omit(props, "key")}
            className={classnames("border-retro-gray relative border-t", {
              "border-dashed": state.index === 1,
              relative: state.index === 1,
            })}
          >
            {state.index === 1 ? (
              <div className="absolute bottom-2 left-1/2 flex min-w-full -translate-x-1/2 justify-between px-[6.5px]">
                <div className="w-max -translate-x-1/2 whitespace-nowrap font-medium uppercase">
                  de {padStart(String(minHour), 2, "0")} h
                </div>
                <div className="w-max translate-x-1/2 whitespace-nowrap font-medium uppercase">
                  à {padStart(String(maxHour), 2, "0")} h
                </div>
              </div>
            ) : null}
          </div>
        )}
        value={[minHour, maxHour]}
        max={24}
        min={0}
        minDistance={1}
        onChange={onChange}
      />
      <div className="border-retro-gray w-16 border-t"></div>
    </div>
  );
}

function Thumb() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="6.5" r="6.5" fill="#6A6A6D" />
    </svg>
  );
}
