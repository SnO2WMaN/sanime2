import { faCompactDisc, faFilm, faGlobe, faOtter, faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { AnimeType } from "~/types";

export const TVAnimeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faTv} className={className} fixedWidth />
);

export const MovieAnimeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faFilm} className={className} fixedWidth />
);

export const OVAAnimeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faCompactDisc} className={className} fixedWidth />
);

export const ONAAnimeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faGlobe} className={className} fixedWidth />
);

export const OthersAnimeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faOtter} className={className} fixedWidth />
);

export const AnimeIcon: React.FC<{ type: AnimeType; className?: string }> = ({ type, ...props }) => {
  switch (type) {
    case "TV":
      return TVAnimeIcon(props);
    case "MOVIE":
      return MovieAnimeIcon(props);
    case "OVA":
      return OVAAnimeIcon(props);
    case "ONA":
      return ONAAnimeIcon(props);
    case "OTHERS":
      return OthersAnimeIcon(props);
  }
};
