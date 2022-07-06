import { faCompactDisc, faFilm, faGlobe, faOtter, faTv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { AnimeType } from "~/types";

export const IconTVAnime: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faTv} className={className} fixedWidth />
);

export const IconMovieAnime: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faFilm} className={className} fixedWidth />
);

export const IconOVAAnime: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faCompactDisc} className={className} fixedWidth />
);

export const IconONAAnime: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faGlobe} className={className} fixedWidth />
);

export const IconOthersAnime: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faOtter} className={className} fixedWidth />
);

export const AnimeIcon: React.FC<{ type: AnimeType; className?: string }> = ({ type, ...props }) => {
  switch (type) {
    case "TV":
      return IconTVAnime(props);
    case "MOVIE":
      return IconMovieAnime(props);
    case "OVA":
      return IconOVAAnime(props);
    case "ONA":
      return IconONAAnime(props);
    case "OTHERS":
      return IconOthersAnime(props);
  }
};
