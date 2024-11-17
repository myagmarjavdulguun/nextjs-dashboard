'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'; 

export async function deleteGraduate(graduate_id: string) {
    try {
      // Delete related trainings first
      await sql`
        DELETE FROM participations
        WHERE graduate_id::TEXT = ${graduate_id};
      `;
  
      // Delete related requests (assuming requests are tied to a training)
      await sql`
        DELETE FROM requests
        WHERE graduate_id::TEXT = ${graduate_id};
      `;
  
      // Delete the instructor
      await sql`
        DELETE FROM graduates
        WHERE graduate_id::TEXT = ${graduate_id};
      `;

      revalidatePath('/home/graduates/delete')
  
      return { message: 'Graduates and related data deleted successfully' };
    } catch (error) {
      console.error('Error deleting graduate and related data:', error);
      return { message: 'Failed to delete graduate and related data' };
    }
}  

export async function deleteInstructor(instructor_id: string) {
    try {
      // Delete related trainings first
      await sql`
        DELETE FROM trainings
        WHERE instructor_id::TEXT = ${instructor_id};
      `;
  
      // Delete related requests (assuming requests are tied to a training)
      await sql`
        DELETE FROM requests
        WHERE instructor_id::TEXT = ${instructor_id};
      `;
  
      // Delete the instructor
      await sql`
        DELETE FROM instructors
        WHERE instructor_id::TEXT = ${instructor_id};
      `;

      revalidatePath('/home/instructors/delete')
  
      return { message: 'Instructor and related data deleted successfully' };
    } catch (error) {
      console.error('Error deleting instructor and related data:', error);
      return { message: 'Failed to delete instructor and related data' };
    }
}  

export async function createGraduate(formData: FormData) {
    const username = formData.get('username')?.toString();
    const firstName = formData.get('first_name')?.toString();
    const lastName = formData.get('last_name')?.toString();
    const password = formData.get('password')?.toString();
    const fieldOfStudy = formData.get('field_of_study')?.toString();
    const major = formData.get('major')?.toString();
    const userType = formData.get('user_type')?.toString(); 

    try {
        // Check if the instructor already exists (based on username or email)
        const existingGraduate = await sql`
          SELECT 1 FROM graduates WHERE username = ${username};
        `;
    
        if (existingGraduate.rowCount > 0) {
          return { message: 'Graduate already exists with this username.' };
        }
    
        // Insert the new instructor into the database
        await sql`
          INSERT INTO graduates (username, first_name, last_name, password, field_of_study, major, user_type)
          VALUES (${username}, ${firstName}, ${lastName}, ${password}, ${fieldOfStudy}, ${major}, ${userType});
        `;
    
        return { message: 'Graduate created successfully!' };
      } catch (error) {
        console.error('Database error:', error);
        return { message: 'Failed to create graduate. Please try again.' };
      }
}

export async function createInstructor(formData: FormData) {
    const username = formData.get('username')?.toString();
    const firstName = formData.get('first_name')?.toString();
    const lastName = formData.get('last_name')?.toString();
    const password = formData.get('password')?.toString();
    const fieldOfStudy = formData.get('field_of_study')?.toString();
    const expertise = formData.get('expertise')?.toString();
    const userType = formData.get('user_type')?.toString();  // Assuming user_type will be either 'admin', 'instructor', etc.
  
    try {
      // Check if the instructor already exists (based on username or email)
      const existingInstructor = await sql`
        SELECT 1 FROM instructors WHERE username = ${username};
      `;
  
      if (existingInstructor.rowCount > 0) {
        return { message: 'Instructor already exists with this username.' };
      }
  
      // Insert the new instructor into the database
      await sql`
        INSERT INTO instructors (username, first_name, last_name, password, field_of_study, expertise, user_type)
        VALUES (${username}, ${firstName}, ${lastName}, ${password}, ${fieldOfStudy}, ${expertise}, ${userType});
      `;
  
      return { message: 'Instructor created successfully!' };
    } catch (error) {
      console.error('Database error:', error);
      return { message: 'Failed to create instructor. Please try again.' };
    }
}

export async function deleteTraining(prevState: State, formData: FormData) {
    const training_id = formData.get('training_id')?.toString();
    const query = formData.get('query')?.toString();

    try {
        await sql`
            DELETE FROM participations WHERE training_id::TEXT = ${training_id};
        `;
        await sql`
            DELETE FROM trainings WHERE training_id::TEXT = ${training_id};
        `;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Database Error: Failed to delete training.');
      }
  
      revalidatePath('/home/trainings?query=' + query);
}

export async function createTraining(prevState: State, formData: FormData) {
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const start_date = formData.get('start_date')?.toString();
    const end_date = formData.get('end_date')?.toString();
    const location = formData.get('location')?.toString();
    const price = formData.get('price')?.toString();
    const instructor_id = formData.get('instructor_id')?.toString();

    try {
        await sql`
            INSERT INTO trainings (title, description, start_date, end_date, location, price, instructor_id) 
            VALUES (${title}, ${description}, ${start_date}, ${end_date}, ${location}, ${price}, ${instructor_id});
        `;
    } catch (error) {
        console.error('Database error:', error);  // Log more specific error
        return {
            message: 'Database Error: Failed to create training.',
        };
    }

    revalidatePath('/home/trainings');
}

export async function deleteParticipation(formData: FormData) {
    const graduate_id = formData.get('graduate_id')?.toString();
    const training_id = formData.get('training_id')?.toString();
    const query = formData.get('query')?.toString();
  
    try {
      await sql`
          DELETE FROM participations WHERE graduate_id::TEXT = ${graduate_id} AND training_id::TEXT = ${training_id};
      `;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database Error: Failed to delete participation.');
    }

    revalidatePath('/home/trainings?query=' + query);
}  

export async function acceptRequest(prevState: State, formData: FormData) {
    const request_id = formData.get('request_id')?.toString();
    const query = formData.get('query')?.toString();

    try {
        await sql`
            UPDATE requests
            SET status = 'accepted'
            WHERE request_id::TEXT = ${request_id};
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to accept request.' }
    }
  
    revalidatePath('/home/graduates?query=' + query);
}

export async function deleteRequest(prevState: State, formData: FormData) {
    const request_id = formData.get('request_id')?.toString();
    const query = formData.get('query')?.toString();

    try {
        await sql`
            DELETE FROM requests WHERE request_id = ${request_id};
        `;
    } catch (error) {
      return { message: 'Database Error: Failed to Delete request.' }
    }

    revalidatePath('/home/instructors?query=' + query);
}

  export async function createParticipation(prevState: State, formData: FormData) {
    const graduate_id = formData.get('graduate_id')?.toString();
    const training_id = formData.get('training_id')?.toString();
    const query = formData.get('query')?.toString();
    console.log('formdata: ', graduate_id, training_id, query);

    try {
        // Check if the participation already exists
        const existingParticipation = await sql`
            SELECT 1
            FROM participations
            WHERE graduate_id = ${graduate_id} AND training_id = ${training_id};
        `;

        if (existingParticipation.rowCount > 0) {
            // If a record exists, return a message
            return { message: 'Participation already exists for this graduate and training.' };
        }

        // Proceed with the insertion if no existing participation found
        await sql`
            INSERT INTO participations (graduate_id, training_id)
            VALUES (${graduate_id}, ${training_id});
        `;

    } catch (error) {
        console.error('Database error:', error);  // Log more specific error
        return {
            message: 'Database Error: Failed to Create participation.',
        };
    }

    // Revalidate the path to reflect the changes
    revalidatePath('/home/trainings?query=' + query);
}

export async function createRequest(prevState: State, formData: FormData) {
    const graduate_id = formData.get('graduate_id')?.toString();
    const instructor_id = formData.get('instructor_id')?.toString();
    const status = formData.get('status')?.toString();
    const query = formData.get('query')?.toString();

    try {
        await sql`
            INSERT INTO requests (graduate_id, instructor_id, status) 
            VALUES (${graduate_id}, ${instructor_id}, ${status});
        `;
    } catch (error) {
        console.error('Database error:', error);  // Log more specific error
        return {
          message: 'Database Error: Failed to Create request.',
        };
    }

    revalidatePath('/home/instructors?query=' + query);
}

export async function createChat(prevState: State, formData: FormData) {
    const message = formData.get('message')?.toString();
    const graduate_id = formData.get('graduate_id')?.toString();
    const instructor_id = formData.get('instructor_id')?.toString();
    const sender = formData.get('sender')?.toString();
    const date = new Date().toISOString();
  
    try {
      await sql`
        INSERT INTO messages (graduate_id, instructor_id, sender, message_content, sent_date)
        VALUES (${graduate_id}, ${instructor_id}, ${sender}, ${message}, ${date});
      `;
    } catch (error) {
      console.error('Database error:', error);  // Log more specific error
      return {
        message: 'Database Error: Failed to Create message.',
      };
    }
  
    revalidatePath('/home/messages?instructor=' + instructor_id);
}
 
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function Logout() {
    try {
        const response = await fetch('/api/auth/logout', { method: 'GET' });
    } catch (error) {
        console.error('Error during logout:', error);
    }
}

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};
   
export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }
   
    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];
   
    // Insert data into the database
    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
   
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
   
    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}