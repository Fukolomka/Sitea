import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const caseData = await prisma.case.findUnique({
      where: { 
        id: params.id,
        isActive: true 
      },
      include: {
        items: {
          include: {
            item: true,
          },
          orderBy: {
            dropRate: 'desc'
          }
        },
      },
    });

    if (!caseData) {
      return NextResponse.json({ 
        success: false, 
        error: 'Case not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: caseData 
    });
  } catch (error) {
    console.error('Case fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch case' 
    }, { status: 500 });
  }
}