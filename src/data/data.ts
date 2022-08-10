import shuffle from 'lodash.shuffle';

export interface IPageData {
  id: string;
  videoSrc: string;
  backgroundVideoSrc: string;
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

const VIDEOS: Record<string, { src: string, names: string[], tags: string[]; backgroundSrc: string; }> = {
  [`1`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/-8333190523638727549.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/-8333190523638727549.mp4',
    names: ['Yana Aleksandrovich', 'Katerina Zaitsava'],
    tags: ['#happybirthday', '#friends', '#allthebest'],
  },
  [`2`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/alina_josh.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/alina_josh.mp4',
    names: ['Alina Klokel'],
    tags: ['#bestview', '#happybirthday'],
  },
  [`3`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/CS.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/CS.mp4',
    names: ['Nadya Tuleyko'],
    tags: ['#miamidream', '#greatsupport'],
  },
  [`4`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/export_1659626997860.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/export_1659626997860.mp4',
    names: ['Alina Chertkova', 'Kate Senkevich', 'Vlada Rudko'],
    tags: ['#bigtasty', '#satellite', '#egnircparty'],
  },
  [`5`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/HB.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/HB.mp4',
    names: ['Anna Druzhinina', 'Maria Odinochenko'],
    tags: ['#birthday', '#healthyandwealthy'],
  },
  [`6`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/IMG_1801.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/IMG_1801.mp4',
    names: ['Anna Kovaleva'],
    tags: ['#vicecity', '#birthdaycake', '#onthewaytomiami'],
  },
  [`7`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/IMG_4982.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/IMG_4982.mp4',
    names: ['Denis Yankovec', 'Yulia Syritskaya', 'Alena Maenova', 'Ksenia Golovchik', 'Dmitry'],
    tags: ['#brooklyn', '#happybirthday'],
  },
  [`8`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/IMG_5792.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/IMG_5792.mp4',
    names: ['Uliana Grechikha'],
    tags: ['#dreamscometrue', '#positive'],
  },
  [`9`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/IMG_7232.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/IMG_7232.mp4',
    names: ['Satellite kayakers'],
    tags: ['#corporateparty', '#satellitefamily'],
  },
  [`10`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/IMG_E0595.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/IMG_E0595.mp4',
    names: ['Sergey Volosyuk'],
    tags: [ '#noupdates', '#bestwishes'],
  },
  [`11`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/Josh.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/Josh.mp4',
    names: ['Nikita Vushev', 'Nastya Chernyavskaya', 'Anna Kovaleva', 'Yaraslau Ilnitski', 'Mikhail Poddubsky', 'Dmitry Lonski'],
    tags: ['#upsidedown', '#imnotbluedabudidabuda', '#dabudiiiiidabudaaaaa'],
  },
  [`12`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/petal_20220804_231143.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/petal_20220804_231143.mp4',
    names: ['Aleksandr Gordeychik'],
    tags: ['#italianovero', '#happybirthday'],
  },
  [`13`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/VID_20220805_104603.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/VID_20220805_104603.mp4',
    names: ['Natalia Subramani'],
    tags: ['#goodluck', '#smileandhavefun'],
  },
  [`14`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/WCteam2.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/WCteam2.mp4',
    names: ['Alina Klokel', 'Pavel Leshok', 'Zakhar Hurinovich', 'Alexandr Mysin', 'Eugene Yakubitsky', 'Viktoria Bogutskaya'],
    tags: ['#longandamazinglife', '#workwithpleasure', '#happybirthday'],
  },
  [`15`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/Jenya.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/Jenya.mp4',
    names: ['Eugenia Vanderstarren'],
    tags: ['#misterjosh', '#satelliteteam'],
  },
  [`16`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/Brad.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/Brad.mp4',
    names: ['Bradley & William Vanderstarrens'],
    tags: ['#cute', '#brother', '#birthdaysong'],
  },
  [`17`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/alex_dima.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/alex_dima.mp4',
    names: ['Alexey Maslovsky', 'Dmitry Kozlovksy'],
    tags: ['#heyjosh', '#happybirthday', '#wow'],
  },
  [`18`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/dima_hide.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/dima_hide.mp4',
    names: ['Dmitry Kozlovksy'],
    tags: ['#heyjosh', '#happybirthday', '#wow'],
  },
  [`19`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/dima_parkour.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/dima_parkour.mp4',
    names: ['Dmitry Kozlovksy'],
    tags: ['#heyjosh', '#happybirthday', '#wow'],
  },
  [`20`]: {
    src: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/JHB.mp4',
    backgroundSrc: 'https://266311286062-us-east-1-joshbirthday.s3-accelerate.amazonaws.com/videos/compressed/JHB.mp4',
    names: ['Satellite Family', 'Robot Voice'],
    tags: ['#robot', '#intro', '#russianaccent'],
  },
};

const PAGES: IPageData[] = [
  {
    id: '20',
    videoSrc: VIDEOS['20'].src,
    backgroundVideoSrc: VIDEOS['20'].backgroundSrc,
    comments: getComments('20'),
    likes: getLikes('20'),
    tags: VIDEOS['20'].tags,
    names: VIDEOS['20'].names,
  },
  ...shuffle(Object.keys(VIDEOS).slice(0, -1).map((key) => {
    return {
      id: key,
      videoSrc: VIDEOS[key].src,
      backgroundVideoSrc: VIDEOS[key].backgroundSrc,
      comments: getComments(key),
      likes: getLikes(key),
      tags: VIDEOS[key].tags,
      names: VIDEOS[key].names,
    };
  })),
];

export default PAGES;
