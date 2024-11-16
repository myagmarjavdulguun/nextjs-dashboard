const graduates = [
  {
    username: 'grad0001',
    first_name: 'Амар',
    last_name: 'Болд',
    password: 'grad0001',
    field_of_study: 'Мэдээлэл технологи, Харилцаа холбоо',
    major: 'Мэдээллийн аюулгүй байдал',
    skills_to_learn: 'үүлэн технологи, веб хөгжүүлэлт',
    user_type: 'graduate',
  },
  {
    username: 'grad0002',
    first_name: 'Ванган',
    last_name: 'Гэрэл',
    password: 'grad0002',
    field_of_study: 'Мэдээлэл технологи, Харилцаа холбоо',
    major: 'Програм хангамж',
    skills_to_learn: 'веб хөгжүүлэлт',
    user_type: 'graduate',
  },
  {
    username: 'grad0003',
    first_name: 'Дулам',
    last_name: 'Ерөөлт',
    password: 'grad0003',
    field_of_study: 'Санхүү, нягтлан бодох бүртгэл',
    major: 'Нягтлан бодох бүртгэл',
    skills_to_learn: 'аудит хяналт',
    user_type: 'graduate',
  },
  {
    username: 'grad0004',
    first_name: 'Ёндон',
    last_name: 'Жавзаа',
    password: 'grad0004',
    field_of_study: 'Санхүү, нягтлан бодох бүртгэл',
    major: 'Санхүү',
    skills_to_learn: 'эдийн засаг',
    user_type: 'graduate',
  },
  {
    username: 'grad0005',
    first_name: 'Зандаа',
    last_name: 'Идэр',
    password: 'grad0005',
    field_of_study: 'Боловсрол, Шинжлэх ухаан',
    major: 'Багш - Гадаад хэл',
    skills_to_learn: 'заах аргазүй',
    user_type: 'graduate',
  },
];

const instructors = [
  {
    username: 'inst0001',
    first_name: 'Лхам',
    last_name: 'Молом',
    password: 'inst0001',
    field_of_study: 'Мэдээлэл технологи, Харилцаа холбоо',
    expertise: 'Мэдээллийн аюулгүй байдал',
    user_type: 'instructor',
  },
  {
    username: 'inst0002',
    first_name: 'Нэргүй',
    last_name: 'Оюу',
    password: 'inst0002',
    field_of_study: 'Мэдээлэл технологи, Харилцаа холбоо',
    expertise: 'Системийн инженер',
    user_type: 'instructor',
  },
  {
    username: 'inst0003',
    first_name: 'Өнөр',
    last_name: 'Пүрэв',
    password: 'inst0003',
    field_of_study: 'Мэдээлэл технологи, Харилцаа холбоо',
    expertise: 'Веб дизайнер',
    user_type: 'instructor',
  },
  {
    username: 'inst0004',
    first_name: 'Равдан',
    last_name: 'Сувд',
    password: 'inst0004',
    field_of_study: 'Санхүү, нягтлан бодох бүртгэл',
    expertise: 'Эдийн засаг',
    user_type: 'instructor',
  },
  {
    username: 'inst0005',
    first_name: 'Төмөр',
    last_name: 'Уянга',
    password: 'inst0005',
    field_of_study: 'Боловсрол, Шинжлэх ухаан',
    expertise: 'Аргазүйч',
    user_type: 'instructor',
  },
];

const admins = [
  {
    username: 'admin',
    password: 'adminpassword',
    user_type: 'admin',
  },
];

const requests = [
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    status: 'accepted',
  },
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: '65999d2b-c2b5-4107-ac32-5cc19c8a881d',
    status: 'pending',
  },
  {
    graduate_id: '37af5453-3682-4d32-83b5-97239887f0f4',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    status: 'accepted',
  },
  {
    graduate_id: 'ad0dfa97-cda6-4a8c-9cf5-d526eea32674',
    instructor_id: '3b15c03f-e434-4ed4-996a-d799c187e864',
    status: 'accepted',
  },
  {
    graduate_id: 'ad0dfa97-cda6-4a8c-9cf5-d526eea32674',
    instructor_id: '0f511040-8d93-493c-927c-f935643ec630',
    status: 'pending',
  },
];

const messages = [
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    sender: 'graduate',
    message_content: 'Sain baina uu',
    sent_date: '4/10/2024, 14:37:49',
  },
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    sender: 'graduate',
    message_content: 'Ym asuuh geed',
    sent_date: '4/10/2024, 14:37:51',
  },
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    sender: 'instructor',
    message_content: 'Сайн, сайн уу. Юу асуух гэсэн юм.',
    sent_date: '4/10/2024, 16:00:05',
  },
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    sender: 'graduate',
    message_content: 'Surgalt hezeenees ehleh ve',
    sent_date: '4/10/2024, 16:01:02',
  },
  {
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    sender: 'instructor',
    message_content: 'Daraa doloo honogoos ehelne',
    sent_date: '4/10/2024, 16:01:27',
  },
];

const trainings = [
  {
    instructor_id: 'cdd10b9c-1a7d-4370-bdfa-692034bdf3d3',
    title: 'Мэдээлийн аюулгүй байдал',
    description: 'Мэдээллийн аюулгүй байдлын талаарх 7 хоногийн сургалт 17:00 - 19:00 цагийн хооронд явагдана.',
    start_date: '2024-11-07',
    end_date: '2024-11-14',
    location: 'Муис 8-р байр, 402 тоот',
    max_participants: 10,
    min_participants: 5,
    price: 15000,
  },
];

const participations = [
  {
    training_id: 'b28c394b-27c1-48e9-86ce-8428ca8edba6',
    graduate_id: '5ccb64e9-390f-451f-b300-bda3309358a9',
  },
  {
    training_id: 'b28c394b-27c1-48e9-86ce-8428ca8edba6',
    graduate_id: '37af5453-3682-4d32-83b5-97239887f0f4',
  },
];

export { admins, graduates, instructors, requests, messages, trainings, participations };
