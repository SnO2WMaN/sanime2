import {
  faCompactDisc,
  faFilm,
  faGlobe,
  faOtter,
  faPlus,
  faRotate,
  faTriangleExclamation,
  faTv,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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

export const IconAnimeType: React.FC<{ type: AnimeType; className?: string }> = ({ type, ...props }) => {
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

export const IconReload: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faRotate} className={className} fixedWidth />
);

export const IconDelete: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faXmark} className={className} fixedWidth />
);

export const IconAdd: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faPlus} className={className} fixedWidth />
);

export const IconError: React.FC<{ className?: string }> = ({ className }) => (
  <FontAwesomeIcon icon={faTriangleExclamation} className={className} fixedWidth />
);
