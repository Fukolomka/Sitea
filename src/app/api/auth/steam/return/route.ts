import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  validateSteamOpenId, 
  extractSteamId, 
  getSteamProfile, 
  generateToken 
} from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = new URLSearchParams();
    
    // Copy all query parameters
    for (const [key, value] of searchParams) {
      params.set(key, value);
    }

    // Validate OpenID response
    if (!validateSteamOpenId(params)) {
      return NextResponse.redirect(new URL('/?error=invalid_auth', request.url));
    }

    const identity = params.get('openid.identity');
    if (!identity) {
      return NextResponse.redirect(new URL('/?error=no_identity', request.url));
    }

    const steamId = extractSteamId(identity);
    if (!steamId) {
      return NextResponse.redirect(new URL('/?error=invalid_steam_id', request.url));
    }

    // Get Steam profile
    const steamProfile = await getSteamProfile(steamId);
    
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { steamId }
    });

    if (!user) {
      // Check if user should be admin
      const adminSteamIds = process.env.ADMIN_STEAM_IDS?.split(',') || [];
      const isAdmin = adminSteamIds.includes(steamId);

      user = await prisma.user.create({
        data: {
          steamId,
          username: steamProfile.personaname,
          avatar: steamProfile.avatarfull,
          role: isAdmin ? 'ADMIN' : 'USER',
        },
      });
    } else {
      // Update user info
      user = await prisma.user.update({
        where: { steamId },
        data: {
          username: steamProfile.personaname,
          avatar: steamProfile.avatarfull,
        },
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Create response with redirect
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Set JWT token in cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Steam auth return error:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}