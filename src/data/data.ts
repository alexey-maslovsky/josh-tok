export interface IPageData {
  id: string;
  videoSrc: string;
  likes: number;
  comments: number;
}

const PAGES: IPageData[] = [
  {
    id: '2',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-past-ground-level-shot-32809-large.mp4',
    likes: 2315,
    comments: 34,
  },
  {
    id: '3',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    likes: 1244,
    comments: 28,
  },
  {
    id: '4',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 1892,
    comments: 17,
  },
];

export default PAGES;
