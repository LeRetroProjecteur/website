export const marseille_zip_to_city: Record<string, string> = {
  13001: "Marseille 1er",
  13002: "Marseille 2e",
  13003: "Marseille 3e",
  13004: "Marseille 4e",
  13005: "Marseille 5e",
  13006: "Marseille 6e",
  13007: "Marseille 7e",
  13008: "Marseille 8e",
  13009: "Marseille 9e",
  13010: "Marseille 10e",
  13011: "Marseille 11e",
  13012: "Marseille 12e",
  13013: "Marseille 13e",
  13014: "Marseille 14e",
  13015: "Marseille 15e",
  13016: "Marseille 16e",
  13100: "Aix-en-Provence",
  13400: "Aubagne",
  13600: "La Ciotat",
  13500: "Martigues",
  13127: "Vitrolles",
  13110: "Port-de-Bouc",
  13130: "Berre-l'Étang",
};

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
  } else if (marseille_zip_to_city[inZip]) {
    const cityName = marseille_zip_to_city[inZip];
    const match = cityName.match(/Marseille (\d+)([a-z]+)/);
    if (match) {
      return (
        <span>
          Marseille {match[1]}
          <sup style={{ lineHeight: 0 }}>{match[2]}</sup>
        </span>
      );
    }
    return <span>{cityName}</span>;
  } else {
    return <span>{inZip}</span>;
  }
}

export function transformZipcodeToString(inZip: string): string {
  // Check for Paris arrondissements
  if (inZip.startsWith("75")) {
    const arrNum = inZip.substring(3, 5);
    if (arrNum === "01") {
      return "1<sup>er</sup>";
    } else if (arrNum.startsWith("0")) {
      return `${arrNum.substring(1)}e`;
    }
    return `${arrNum}e`;
  }

  // Check for Marseille
  if (marseille_zip_to_city[inZip]) {
    return marseille_zip_to_city[inZip];
  }

  return inZip;
}
