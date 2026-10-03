import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Affiliate from '@/model/affiliate';

// GET: Fetch list of affiliates or search by partner_code/phone
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const phone = searchParams.get('phone');

    if (code) {
      const affiliate = await Affiliate.findOne({
        partner_code: code.trim().toUpperCase(),
        is_active: true
      });
      if (!affiliate) {
        return NextResponse.json({ success: false, message: 'Partner code not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, affiliate });
    }

    if (phone) {
      const affiliate = await Affiliate.findOne({ whatsapp_phone: phone.trim() });
      if (!affiliate) {
        return NextResponse.json({ success: false, message: 'Partner phone not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, affiliate });
    }

    const affiliates = await Affiliate.find({}).sort({ created_at: -1 }).limit(100);
    const totalAffiliates = await Affiliate.countDocuments();
    const totalRevenueResult = await Affiliate.aggregate([
      { $group: { _id: null, total: { $sum: '$total_revenue_generated' }, commission: { $sum: '$total_commission_earned' } } }
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const totalCommission = totalRevenueResult[0]?.commission || 0;

    return NextResponse.json({
      success: true,
      stats: {
        totalAffiliates,
        totalRevenue,
        totalCommission,
      },
      affiliates
    });
  } catch (error: any) {
    console.error('Error fetching affiliates:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to fetch affiliates' },
      { status: 500 }
    );
  }
}

// POST: Register a new affiliate or update bank details
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const fullName = (body.fullName || body.full_name || '').trim();
    const whatsappPhone = (body.whatsappPhone || body.whatsapp_phone || '').trim();
    const cityState = (body.cityState || body.city_state || '').trim();
    const promotionChannel = (body.promotionChannel || body.promotion_channel || 'WhatsApp Status').trim();
    const rawHandle = (body.customHandle || body.custom_handle || body.handle || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!fullName || !whatsappPhone) {
      return NextResponse.json(
        { success: false, message: 'Full name and WhatsApp phone are required' },
        { status: 400 }
      );
    }

    // Check if phone already registered
    const existing = await Affiliate.findOne({ whatsapp_phone: whatsappPhone });
    if (existing) {
      // If updating bank info
      if (body.nuban && body.bankName) {
        existing.bank_details = {
          bank_name: body.bankName,
          nuban_account_number: body.nuban,
          account_name_resolved: body.verifiedName || fullName.toUpperCase(),
          is_verified: true,
          created_at: new Date()
        };
        await existing.save();
        return NextResponse.json({
          success: true,
          message: 'Bank details updated successfully',
          affiliate: existing
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Affiliate already registered. Session restored.',
        affiliate: existing
      });
    }

    // Generate unique Partner ID & Handle
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const partnerId = `LUM-${randomSuffix}`;
    const handleClean = rawHandle || fullName.split(' ')[0].toUpperCase().replace(/[^A-Z0-9]/g, '') || 'VIP';
    let partnerCode = `LUMEY-${handleClean}`;

    // Verify code uniqueness
    const codeConflict = await Affiliate.findOne({ partner_code: partnerCode });
    if (codeConflict) {
      partnerCode = `LUMEY-${handleClean}${Math.floor(10 + Math.random() * 90)}`;
    }

    const referralLink = `https://lumeyenergy.com/?ref=${partnerCode}`;

    let bankDetails = null;
    if (body.nuban && body.bankName) {
      bankDetails = {
        bank_name: body.bankName,
        nuban_account_number: body.nuban,
        account_name_resolved: body.verifiedName || fullName.toUpperCase(),
        is_verified: true,
        created_at: new Date()
      };
    }

    const newAffiliate = new Affiliate({
      partner_id: partnerId,
      full_name: fullName,
      whatsapp_phone: whatsappPhone,
      city_state: cityState || 'Lagos, Nigeria',
      promotion_channel: promotionChannel,
      custom_handle: handleClean,
      partner_code: partnerCode,
      referral_link: referralLink,
      tier: 'Starter (5.0%)',
      commission_rate: 0.05,
      bank_details: bankDetails,
      is_active: true
    });

    await newAffiliate.save();

    return NextResponse.json({
      success: true,
      message: 'Affiliate registered successfully!',
      affiliate: newAffiliate
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating affiliate:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to create affiliate' },
      { status: 500 }
    );
  }
}
