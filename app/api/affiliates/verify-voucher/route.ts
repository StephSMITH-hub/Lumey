import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Affiliate from '@/model/affiliate';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawCode = (body.voucher_code || body.code || '').trim().toUpperCase();

    if (!rawCode) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid voucher code' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find the partner
    const affiliate = await Affiliate.findOne({
      partner_code: rawCode,
      is_active: true
    });

    if (!affiliate) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          message: 'Invalid or expired voucher code. Please check and try again.'
        },
        { status: 404 }
      );
    }

    // Standard partner voucher discount is ₦5,000 off any PowerBox model
    const discountAmount = 5000;

    return NextResponse.json({
      success: true,
      valid: true,
      message: `Partner voucher code verified! ₦${discountAmount.toLocaleString()} discount applied.`,
      voucher: {
        code: affiliate.partner_code,
        discount_amount: discountAmount,
        partner_name: affiliate.full_name,
        partner_id: affiliate.partner_id,
        affiliate_uuid: affiliate.uuid,
        commission_rate: affiliate.commission_rate
      }
    });
  } catch (error: any) {
    console.error('Error verifying voucher:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to verify voucher' },
      { status: 500 }
    );
  }
}
