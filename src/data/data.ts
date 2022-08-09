export interface IPageData {
  id: string;
  videoSrc: string;
  likes: number;
  comments: number;
  tags: string[];
  names: string[];
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

const VIDEOS: Record<string, { src: string, names: string[], tags: string[] }> = {
  [`1`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/-8333190523638727549.mp4',
    names: ['Yana Aleksandrovich', 'Katerina Zaitsava'],
    tags: ['#happybirthday', '#friends', '#allthebest'],
  },
  [`2`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/alina_josh.mp4',
    names: ['Alina Klokel'],
    tags: ['#bestview', '#happybirthday'],
  },
  [`3`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/CS.mp4',
    names: ['Nadya Tuleyko'],
    tags: ['#miamidream', '#greatsupport'],
  },
  [`4`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/export_1659626997860.mp4',
    names: ['Alina Chertkova', 'Kate Senkevich', 'Vlada Rudko'],
    tags: ['#bigtasty', '#satellite', '#egnircparty'],
  },
  [`5`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/HB.mp4',
    names: ['Anna Druzhinina', 'Maria Odinochenko'],
    tags: ['#birthday', '#healthyandwealthy'],
  },
  [`6`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_1801.mp4',
    names: ['Anna Kovaleva'],
    tags: ['#vicecity', '#birthdaycake', '#onthewaytomiami'],
  },
  [`7`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_4982.mp4',
    names: ['Denis Yankovec', 'Yulia Syritskaya', 'Alena Maenova', 'Ksenia Golovchik', 'Dmitry'],
    tags: ['#brooklyn', '#happybirthday'],
  },
  [`8`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_5792.mp4',
    names: ['Uliana Grechikha'],
    tags: ['#dreamscometrue', '#positive'],
  },
  [`9`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_7232.mp4',
    names: ['Satellite kayakers'],
    tags: ['#corporateparty', '#satellitefamily'],
  },
  [`10`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/IMG_E0595.mp4',
    names: ['Sergey Volosyuk'],
    tags: [ '#noupdates', '#bestwishes'],
  },
  [`11`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/Josh.mp4',
    names: ['Nikita Vushev', 'Nastya Chernyavskaya', 'Anna Kovaleva', 'Yaraslau Ilnitski', 'Mikhail Poddubsky', 'Dmitry Lonski'],
    tags: ['#upsidedown', '#imnotbluedabudidabuda', '#dabudiiiiidabudaaaaa'],
  },
  [`12`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/petal_20220804_231143.mp4',
    names: ['Aleksandr Gordeychik'],
    tags: ['#italianovero', '#happybirthday'],
  },
  [`13`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/VID_20220805_104603.mp4',
    names: ['Natalia Subramani'],
    tags: ['#goodluck', '#smileandhavefun'],
  },
  [`14`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3.amazonaws.com/videos/WCteam1.mp4',
    names: ['Alina Klokel', 'Pavel Leshok', 'Zakhar Hurinovich', 'Alexandr Mysin', 'Eugene Yakubitsky', 'Viktoria Bogutskaya'],
    tags: ['#longandamazinglife', '#workwithpleasure', '#happybirthday'],
  },
};

const PAGES: IPageData[] = Object.keys(VIDEOS).map((key) => {
  return {
    id: key,
    videoSrc: VIDEOS[key].src,
    comments: getComments(key),
    likes: getLikes(key),
    tags: VIDEOS[key].tags,
    names: VIDEOS[key].names,
  };
});

export default PAGES;
