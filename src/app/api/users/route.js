// pages/api/users.js
import dbConnect from '../../lib/mongodb.js';
import User from '../../actions/User.js';

export async function POST(req, res) {
  await dbConnect();
  const body = await req.json();

  console.log('Request body:', body); // Log request body
  try {
    const user = await User.create(body);
    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}