import { useCallback, useState } from "react";

import Events from "./events";
import FilterBar from "./filter-bar";
import QuartierSelector from "./quartier-selector";
import QuartierSelectorToggler from "./quartier-selector-toggler";
import TimeSlider from "./time-slider";

export default function CalendarFilters({
  withTimeSlider = true,
  withQuartierSelector = true,
}: {
  withTimeSlider?: boolean;
  withQuartierSelector?: boolean;
}) {
  const [isQuartierSelectorOpen, setQuartierSelectorOpen] = useState(false);
  const toggleQuartierSelectorOpen = useCallback(
    () => setQuartierSelectorOpen(!isQuartierSelectorOpen),
    [setQuartierSelectorOpen, isQuartierSelectorOpen],
  );
  return (
    <>
      {withTimeSlider && <TimeSlider />}
      {withQuartierSelector ? (
        <>
          <div className="hidden lg:flex lg:flex-row lg:flex-col">
            <div className="flex grow flex-row gap-x-20px">
              <div className="flex w-225px">
                <QuartierSelectorToggler
                  toggleOpen={toggleQuartierSelectorOpen}
                  isOpen={isQuartierSelectorOpen}
                />
              </div>
              <div className="flex w-225px">
                <Events />
              </div>
              <div className="flex grow">
                <FilterBar />
              </div>
            </div>
            {isQuartierSelectorOpen && (
              <div className="pt-20px">
                <QuartierSelector />
              </div>
            )}
          </div>
          <div className="lg:hidden">
            <div className="grid grow grid-cols-[repeat(auto-fill,_minmax(40%,_1fr))] gap-x-15px">
              <div className="flex">
                <QuartierSelectorToggler
                  toggleOpen={toggleQuartierSelectorOpen}
                  isOpen={isQuartierSelectorOpen}
                />
              </div>
              <div className="flex">
                <Events />
              </div>
            </div>
            {isQuartierSelectorOpen && (
              <div className="flex pt-8px">
                <QuartierSelector />{" "}
              </div>
            )}
            <div className="flex grow pt-15px">
              <FilterBar />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="flex grow pt-15px lg:pt-0">
            <FilterBar />
          </div>
        </div>
      )}
    </>
  );
}
