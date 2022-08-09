export interface IPageData {
  id: string;
  videoSrc: string;
  likes: number;
  comments: number;
}

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

const PAGES: IPageData[] = [
  {
    id: '2',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-past-ground-level-shot-32809-large.mp4',
    likes: getLikes('2'),
    comments: getComments('2'),
  },
  {
    id: '3',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    likes: getLikes('3'),
    comments: getComments('3'),
  },
  {
    id: '4',
    videoSrc: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: getLikes('4'),
    comments: getComments('4'),
  },
];

export default PAGES;
