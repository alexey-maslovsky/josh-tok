import sampleSize from 'lodash.samplesize';

export interface IPageData {
  id: string;
  videoSrc: string;
  likes: number;
  comments: number;
  tags: string[];
  names: string[];
}

const TAGS = ['love', 'satellite', 'josh', 'happybirthday', 'party', 'wow', 'omg', 'yeaaah'];

const getTags = (id: string) => {
  const localTags = localStorage.getItem(`${id}/tags`);

  if (!localTags) {
    const tags = sampleSize(TAGS, 4);

    localStorage.setItem(`${id}/tags`, JSON.stringify(tags));

    return tags;
  }

  return JSON.parse(localTags);
};

const getLikes = (id: string) => {
  const localLikes = localStorage.getItem(`${id}/likes`);

  if (!localLikes) {
    const likes = Math.round(Math.random() * 60 + 300);

    localStorage.setItem(`${id}/likes`, likes.toString());

    return likes;
  }

  return Number(localLikes);
};

const getComments = (id: string) => {
  const localComments = localStorage.getItem(`${id}/comments`);

  if (!localComments) {
    const comments = Math.round(Math.random() * 60 + 300);

    localStorage.setItem(`${id}/comments`, comments.toString());

    return comments;
  }

  return Number(localComments);
};

const VIDEOS: Record<string, { src: string, names: string[] }> = {
  [`1`]: {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-past-ground-level-shot-32809-large.mp4',
    names: ['Alex Maslovsky', 'Josh Aowqeid', 'Brad ASdoasdj'],
  },
  [`2`]: {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    names: ['QQQQ Maslovsky', '@@@ Aowqeid', 'BBBB ASdoasdj'],
  },
  [`3`]: {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    names: ['Aqwewq Maslovsky', 'Josh Aowqeid', 'Brad ASdoasdj'],
  },
};

const PAGES: IPageData[] = Object.keys(VIDEOS).map((key) => {
  return {
    id: key,
    videoSrc: VIDEOS[key].src,
    comments: getComments(key),
    likes: getLikes(key),
    tags: getTags(key),
    names: VIDEOS[key].names,
  };
});

export default PAGES;
