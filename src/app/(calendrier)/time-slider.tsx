import clsx from "clsx";
import { omit, padStart } from "lodash-es";
import ReactSlider from "react-slider";

import { ButtonCopy } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";

export default function TimeSlider() {
  const minHour = useCalendrierStore((s) => s.minHour);
  const maxHour = useCalendrierStore((s) => s.maxHour);
  const setMinHour = useCalendrierStore((s) => s.setMinHour);
  const setMaxHour = useCalendrierStore((s) => s.setMaxHour);

  const onChange = ([newMinHour, newMaxHour]: [number, number]) => {
    setMinHour(newMinHour);
    setMaxHour(newMaxHour);
  };

  return (
    <div className="flex grow flex-col justify-between">
      <div className="flex">
        <div className="pb-10px lg:pb-20px">
          <ButtonCopy>Horaires :&nbsp;</ButtonCopy>
        </div>
        <div className="flex grow justify-between">
          <div className="relative left-0">
            <ButtonCopy>{`de ${padStart(
              String(minHour),
              2,
              "0",
            )}h`}</ButtonCopy>
          </div>
          <div className="relative right-0">
            <ButtonCopy>{`à ${padStart(String(maxHour), 2, "0")}h`}</ButtonCopy>
          </div>
        </div>
      </div>
      <div className="relative flex">
        <div className="absolute bottom-0 flex w-full grow border-t" />
        <div className="z-10 mx-2 flex h-[2px] grow bg-white">
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
      className="h-13px w-13px fill-retro-gray"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6.5" cy="6.5" r="6.5" />
    </svg>
  );
}
