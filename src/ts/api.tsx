import axios, {AxiosPromise} from 'axios';
import {IToken} from './init';

export interface IImage {
  height: number;
  url: string;
  width: number;
};

export interface IArtist {
  external_urls: Object;
  followers: {href?: string, total: number},
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<IImage>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IGetTopResults {
  href: string;
  items: Array<IArtist>;
  next?: string;
  offset: number;
  previous?: string;
  tota: number;
};

export const getTop = ({accessToken}: IToken, limit: number): AxiosPromise<IGetTopResults> => axios.get(
  'https://api.spotify.com/v1/me/top/artists',
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      limit,
      time_range: 'short_term',
    },
  }
);
