import { Assignment } from '$lib/models/assignment';
import connectDB from '$lib/db';

// Fetch all assignments (READ)
export async function GET() {
  await connectDB();
  const assignments = await Assignment.find();
  return new Response(JSON.stringify(assignments));
}

// Create a new assignment (CREATE)
export async function POST({ request }) {
  await connectDB();
  const data = await request.json();
  const newAssignment = new Assignment(data);
  await newAssignment.save();
  return new Response(JSON.stringify(newAssignment), { status: 201 });
}

// Update an assignment (UPDATE)
export async function PUT({ request }) {
  await connectDB();
  const data = await request.json();
  const updatedAssignment = await Assignment.findByIdAndUpdate(data._id, data, { new: true });
  return new Response(JSON.stringify(updatedAssignment), { status: 200 });
}

// Delete an assignment (DELETE)
export async function DELETE({ request }) {
  await connectDB();
  const data = await request.json();
  await Assignment.findByIdAndDelete(data._id);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
