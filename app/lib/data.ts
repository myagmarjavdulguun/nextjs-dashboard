import { db, sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';

type Message = {
  graduate_id: string;
  instructor_id: string;
  message_content: string;
  sender: string;
  sent_date: Date;
  // Add other fields as needed
};

const client = await db.connect();

export async function getCurrentTrainings(graduate_id: string, instructor_id: string) {
  try {
    let trainins;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch messages data.');
  }
}

export async function getMessages(graduate_id: string, instructor_id: string) {
  try {
    const messages = await client.sql`
      SELECT * 
      FROM messages
      WHERE graduate_id = ${graduate_id} AND instructor_id = ${instructor_id}
      ORDER BY sent_date;
    `;

    return messages.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch messages data.');
  }
}

export async function getOtherInstructors(username: string) {
  try {
    // Fetch instructors based on the provided username and accepted requests
    const instructors = await client.sql`
      SELECT *
      FROM instructors
      WHERE instructor_id::TEXT NOT IN (
        SELECT instructor_id
        FROM requests r
        INNER JOIN graduates g ON r.graduate_id::TEXT = g.graduate_id::TEXT
        WHERE g.username = ${username}
      );
    `;
    
    // Return the results, ensure it's an empty array if no instructors found
    return instructors.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch requested instructor data.');
  }
}

export async function getRequestedInstructors(username: string) {
  try {
    // Fetch instructors based on the provided username and accepted requests
    const instructors = await client.sql`
      SELECT i.*
      FROM requests r
      FULL JOIN instructors i ON r.instructor_id::TEXT = i.instructor_id::TEXT
      FULL JOIN graduates g ON r.graduate_id::TEXT = g.graduate_id::TEXT
      WHERE g.username = ${username} AND r.status = 'pending';
    `;
    
    // Return the results, ensure it's an empty array if no instructors found
    return instructors.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch requested instructor data.');
  }
}

export async function getAcceptedGraduates(username: string) {
  try {
    const graduates = await client.sql`
      SELECT g.*
      FROM requests r
      FULL JOIN instructors i ON r.instructor_id::TEXT = i.instructor_id::TEXT
      FULL JOIN graduates g ON r.graduate_id::TEXT = g.graduate_id::TEXT
      WHERE i.username = ${username} AND r.status = 'accepted';
    `;

    return graduates.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch accepted graduates data.');
  }
} 

export async function getAcceptedInstructors(username: string) {
  try {
    // Fetch instructors based on the provided username and accepted requests
    const instructors = await client.sql`
      SELECT i.*
      FROM requests r
      FULL JOIN instructors i ON r.instructor_id::TEXT = i.instructor_id::TEXT
      FULL JOIN graduates g ON r.graduate_id::TEXT = g.graduate_id::TEXT
      WHERE g.username = ${username} AND r.status = 'accepted';
    `;
    
    // Return the results, ensure it's an empty array if no instructors found
    return instructors.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch accepted instructor data.');
  }
}

export async function getUser(username: string, usertype: string) {
  try {
    if (usertype == 'graduate') {
      const user = await client.sql`SELECT * FROM graduates WHERE username = ${username};`;
      return user.rows[0];
    } else if (usertype == 'instructor') {
      const user = await client.sql`SELECT * FROM instructors WHERE username = ${username}`;
      return user.rows[0];
    } else if (usertype == 'admin') {
      const user = await client.sql`SELECT * FROM admins WHERE username = ${username}`;
      return user.rows[0];
    }
    return null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function isLoggedIn() {
  // Retrieve the session cookie
  const sessionCookie = (await cookies()).get('session')?.value;

  let sessionData = null;
  if (sessionCookie) {
    try {
      // Decrypt and parse the cookie
      const decryptedData = sessionCookie; // Simulate decrypt here
      sessionData = JSON.parse(decryptedData);
    } catch (error) {
      console.error("Failed to decrypt or parse session data", error);
      sessionData = null;
    }
  }

  if (sessionData) {
    // Fetch the user from the database
    const user = await getUser(sessionData.username, sessionData.usertype);

    if (user) {
      // Compare the password from session data with the password stored in the database
      const isPasswordMatch = await bcrypt.compare(sessionData.password, user.password);

      if (isPasswordMatch) {
        // If the password matches, return session data
        return { sessionData };
      } else {
        // If the password doesn't match, return null (invalid session)
        console.error("Password mismatch for user:", sessionData.username);
        return null;
      }
    } else {
      // If no user found, return null
      console.error("User not found:", sessionData.username);
      return null;
    }
  } else {
    // Return null if no session data
    return null;
  }
}

export async function fetchInstructors() {
  try {
    const data = await client.sql`SELECT * FROM instructors`;

    return data?.rows || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch instructors data.');
  }
}

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}