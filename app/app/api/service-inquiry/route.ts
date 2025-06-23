
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      company, 
      phone, 
      serviceType, 
      projectDetails, 
      budget, 
      timeline, 
      additionalInfo 
    } = body;

    if (!name || !email || !serviceType || !projectDetails) {
      return NextResponse.json(
        { error: 'Required fields: name, email, serviceType, projectDetails' },
        { status: 400 }
      );
    }

    // Save service inquiry to database
    const serviceInquiry = await prisma.serviceInquiry.create({
      data: {
        name,
        email,
        company,
        phone,
        serviceType,
        projectDetails,
        budget,
        timeline,
        additionalInfo,
      },
    });

    return NextResponse.json(
      { 
        message: 'Service inquiry submitted successfully',
        id: serviceInquiry.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Service inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
