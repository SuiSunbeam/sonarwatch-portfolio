import { Platform } from '@sonarwatch/portfolio-core';
import { Fetcher } from '../../Fetcher';
import { Job } from '../../Job';
import positionsFetcher from './positionsFetcher';
import { hawksightPlatform } from './constants';

export const jobs: Job[] = [];
export const fetchers: Fetcher[] = [positionsFetcher];
export const platforms: Platform[] = [hawksightPlatform];
