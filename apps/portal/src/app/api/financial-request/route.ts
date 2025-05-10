import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Log the received data for debugging
    console.log('Received financial request data:', formData);

    // Here you would typically:
    // 1. Validate the data
    // 2. Process the data (save to database, etc.)
    // 3. Return an appropriate response

    // For now, we'll just simulate a successful submission
    return NextResponse.json(
      {
        success: true,
        message: 'Financial request submitted successfully',
        requestId:
          'FR-' +
          Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, '0'),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error processing financial request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process financial request',
      },
      { status: 500 },
    );
  }
}
