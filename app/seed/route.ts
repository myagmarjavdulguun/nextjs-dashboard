import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { admins, graduates, instructors, requests, messages, trainings, participations } from '../lib/placeholder-data';

const client = await db.connect();

async function seedParticipations() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS participations (
            participation_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            training_id VARCHAR(255) NOT NULL,
            graduate_id VARCHAR(255) NOT NULL
        );
    `;
    await client.sql`TRUNCATE TABLE participations`;

    const insertedParticipations = await Promise.all(
        participations.map((participation) => {
            return client.sql`
                INSERT INTO participations (training_id, graduate_id)
                VALUES (${participation.training_id}, ${participation.graduate_id})
                ON CONFLICT (participation_id) DO NOTHING;
            `;
        }),
    );

    return insertedParticipations;
}

async function seedInstructors() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS instructors (
      instructor_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      field_of_study VARCHAR(255),
      expertise VARCHAR(255),
      user_type VARCHAR(255)
    );
  `;
  await client.sql`TRUNCATE TABLE instructors`;

  const insertedInstructors = await Promise.all(
    instructors.map(async (instructor) => {
      const hashedPassword = await bcrypt.hash(instructor.password, 10);
      return client.sql`
        INSERT INTO instructors (username, first_name, last_name, password, field_of_study, expertise, user_type)
        VALUES (${instructor.username}, ${instructor.first_name}, ${instructor.last_name}, ${hashedPassword}, ${instructor.field_of_study}, ${instructor.expertise}, ${instructor.user_type})
        ON CONFLICT (instructor_id) DO NOTHING;
      `;
    }),
  );

  return insertedInstructors;
}

async function seedGraduates() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS graduates (
      graduate_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      field_of_study VARCHAR(255),
      major VARCHAR(255),
      skills_to_learn TEXT,
      user_type VARCHAR(255)
    );
  `;
  await client.sql`TRUNCATE TABLE graduates`;

  const insertedGraduates = await Promise.all(
    graduates.map(async (graduate) => {
      const hashedPassword = await bcrypt.hash(graduate.password, 10);
      return client.sql`
        INSERT INTO graduates (username, first_name, last_name, password, field_of_study, major, skills_to_learn, user_type)
        VALUES (${graduate.username}, ${graduate.first_name}, ${graduate.last_name}, ${hashedPassword}, ${graduate.field_of_study}, ${graduate.major}, ${graduate.skills_to_learn}, ${graduate.user_type})
        ON CONFLICT (graduate_id) DO NOTHING;
      `;
    }),
  );

  return insertedGraduates;
}

async function seedAdmins() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS admins (
      admin_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password TEXT NOT NULL,
      user_type VARCHAR(255)
    );
  `;
  await client.sql`TRUNCATE TABLE admins`;

  const insertedAdmins = await Promise.all(
    admins.map(async (admin) => {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      return client.sql`
        INSERT INTO admins (username, password, user_type)
        VALUES (${admin.username}, ${hashedPassword}, ${admin.user_type})
        ON CONFLICT (admin_id) DO NOTHING;
      `;
    }),
  );

  return insertedAdmins;
}

async function seedRequests() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS requests (
      request_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      graduate_id VARCHAR(255) NOT NULL,
      instructor_id VARCHAR(255) NOT NULL,
      status VARCHAR(255) NOT NULL
    );
  `;

  const insertedRequests = await Promise.all(
    requests.map(async (request) => {
      return client.sql`
        INSERT INTO requests (graduate_id, instructor_id, status)
        VALUES (${request.graduate_id}, ${request.instructor_id}, ${request.status})
        ON CONFLICT (request_id) DO NOTHING;
      `;
    }),
  );

  return insertedRequests;
}

async function seedMessages() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS messages (
      message_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      graduate_id VARCHAR(255) NOT NULL,
      instructor_id VARCHAR(255) NOT NULL,
      sender VARCHAR(255) NOT NULL,
      message_content TEXT NOT NULL,
      sent_date TIMESTAMP NOT NULL
    );
  `;

  const insertedMessages = await Promise.all(
    messages.map(async (message) => {
      return client.sql`
        INSERT INTO messages (graduate_id, instructor_id, sender, message_content, sent_date)
        VALUES (${message.graduate_id}, ${message.instructor_id}, ${message.sender}, ${message.message_content}, ${message.sent_date})
        ON CONFLICT (message_id) DO NOTHING;
      `;
    }),
  );

  return insertedMessages;
}

async function seedTrainings() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS trainings (
      training_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      instructor_id VARCHAR(255) NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      start_date DATE,
      end_date DATE,
      location VARCHAR(255),
      max_participants NUMERIC,
      min_participants NUMERIC, 
      price NUMERIC
    );
  `;

  const insertedTrainings = await Promise.all(
    trainings.map(async (training) => {
      return client.sql`
        INSERT INTO trainings (instructor_id, title, description, start_date, end_date, location, max_participants, min_participants, price) 
        VALUES (${training.instructor_id}, ${training.title}, ${training.description}, ${training.start_date}, ${training.end_date}, ${training.location}, ${training.max_participants}, ${training.min_participants}, ${training.price})
        ON CONFLICT (training_id) DO NOTHING;
      `;
    }),
  );

  return insertedTrainings;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    //await seedAdmins();
    //await seedGraduates();
    //await seedInstructors();
    //await seedRequests();
    //await seedMessages();
    //await seedTrainings();
    //await seedParticipations();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
