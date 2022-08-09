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
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/-8333190523638727549.mp4',
    names: ['Yana Aleksandrovich', 'Katerina Zaitsava'],
  },
  [`2`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/alina_josh.mp4',
    names: ['Alina Klokel'],
  },
  [`3`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/CS.mp4',
    names: ['Nadya Tuleyko'],
  },
  [`4`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/export_1659626997860.mp4',
    names: ['Alina Chertkova', 'Kate Senkevich', 'Vlada Rudko'],
  },
  [`5`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/HB.mp4',
    names: ['Anna Druzhinina', 'Maria Odinochenko'],
  },
  [`6`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_1801.mp4',
    names: ['Anna Kovaleva'],
  },
  [`7`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_4982.mp4',
    names: ['Denis Yankovec', 'Yulia Syritskaya', 'Alena Maenova', 'Ksenia Golovchik', 'Dmitry'],
  },
  [`8`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_5792.mp4',
    names: ['Uliana Grechikha'],
  },
  [`9`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_7232.mp4',
    names: ['Satellite kayakers'],
  },
  [`10`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_E0595.mp4',
    names: ['Sergey Volosyuk'],
  },
  [`11`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/Josh.mp4',
    names: ['Nikita Vushev', 'Nastya Chernyavskaya', 'Anna Kovaleva', 'Yaraslau Ilnitski', 'Mikhail Poddubsky', 'Dmitry Lonski'],
  },
  [`12`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/petal_20220804_231143.mp4',
    names: ['Aleksandr Gordeychik'],
  },
  [`13`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/VID_20220805_104603.mp4',
    names: ['Natalia Subramani'],
  },
  [`14`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/WCteam1.mp4',
    names: ['Alina Klokel', 'Pavel Leshok', 'Zakhar Hurinovich', 'Alexandr Mysin', 'Eugene Yakubitsky', 'Viktoria Bogutskaya'],
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
