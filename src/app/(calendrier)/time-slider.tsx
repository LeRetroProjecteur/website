import clsx from "clsx";
import { omit, padStart } from "lodash-es";
import ReactSlider from "react-slider";

import { ButtonCopy } from "@/components/typography/typography";
import { useCalendrierStore } from "@/lib/calendrier-store";
import { checkNotNull } from "@/lib/util";

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
        <div className="z-10 flex h-[2px] grow">
          <ReactSlider
            className="grow"
            renderThumb={(props) => (
              <div
                key={props.key}
                {...omit({ ...props }, "key")}
                className="bottom-[-24px] cursor-pointer outline-none"
              >
                <Thumb />
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                key={props.key}
                {...omit(
                  {
                    ...props,
                    style: {
                      ...props.style,
                      ...adjustPx(
                        props.style as { left: string; right: string },
                        state.index === 1 || state.index == 2 ? 25 : 0,
                        state.index === 0 || state.index === 1 ? 25 : 0,
                      ),
                    },
                  },
                  "key",
                )}
                className={clsx("bottom-0 border-t", {
                  "border-dotted": state.index != 1,
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
      className="h-50px w-50px fill-retro-gray"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="50" height="50" className="fill-[#FFFFFF00]" />
      <circle cx="25" cy="25" r="6.5" />
    </svg>
  );
}

function adjustPx(
  { left, right }: { left: string; right: string },
  dLeft: number,
  dRight: number,
) {
  const leftPx = parseInt(checkNotNull(/([0-9])+/.exec(left))[0]);
  const rightPx = parseInt(checkNotNull(/([0-9])+/.exec(right))[0]);
  return { left: `${leftPx + dLeft}px`, right: `${rightPx + dRight}px` };
}
