import React from "react";

export function transformZipcode(inZip: string) {
  if (inZip.substring(0, 2) == "75") {
    inZip = inZip.substring(3, 5);
    if (inZip == "01") {
      return (
        <span>
          1<sup style={{ lineHeight: 0 }}>er</sup>
        </span>
      );
    } else if (inZip.substring(0, 1) == "0") {
      inZip = inZip.substring(1, 2);
    }
    return (
      <span>
        {inZip}
        <sup style={{ lineHeight: 0 }}>e</sup>
      </span>
    );
  } else {
    return <span>{inZip}</span>;
  }
}

export function transformZipcodeToString(inZip: string): string {
  if (inZip.substring(0, 2) === "75") {
    const arrNum = inZip.substring(3, 5);
    if (arrNum === "01") {
      return "1<sup>er</sup>";
    } else if (arrNum.substring(0, 1) === "0") {
      return `${arrNum.substring(1)}e`;
    }
    return `${arrNum}e`;
  }
  return inZip;
}
