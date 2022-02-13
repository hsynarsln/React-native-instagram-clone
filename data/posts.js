import { USERS } from './users';

export const POSTS = [
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgBwqy-CsXpBHVmVAqumra_XbWcLmaPE-tBw&usqp=CAU',
    user: USERS[0].user,
    likes: 1435,
    caption: 'No apps connected. Sending "reload" to all React Native apps failed. Make sure your app is running in the simulator or on a phone connected via USB.',
    profile_pic: USERS[0].image,
    comments: [
      {
        user: USERS[3].user,
        comment: 'React is awesome'
      },
      {
        user: USERS[1].user,
        comment: 'React is awesome'
      }
    ]
  },
  {
    imageUrl: 'https://belajarreactjs.com/wp-content/uploads/2019/09/reactjs2.jpg',
    user: USERS[1].user,
    likes: 987,
    caption: 'React Project',
    profile_pic: USERS[1].image,
    comments: [
      // {
      //   user: USERS[2].user,
      //   comment: 'React is awesome'
      // }
    ]
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBW6qtiebQd4XIjvnmn4TtSnlOutze4uWb0w&usqp=CAU',
    user: USERS[3].user,
    likes: 3500,
    caption: 'Angular',
    profile_pic: USERS[3].image,
    comments: [
      {
        user: USERS[2].user,
        comment: 'Angular is awesome'
      }
    ]
  }
];
