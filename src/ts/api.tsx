import axios, {AxiosPromise} from 'axios';
import {IToken} from './init';

interface IImage {
  height: number;
  url: string;
  width: number;
};

interface IArtist {
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

interface IGetTopResults {
  href: string;
  items: Array<IArtist>;
  next?: string;
  offset: number;
  previous?: string;
  tota: number;
};

export const getTop = (token: IToken, count: number): AxiosPromise<IGetTopResults> => axios.get(
  'https://api.spotify.com/v1/me/top/artists',
  {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    params: {
      limit: count,
      time_range: 'short_term',
    },
  }
);
