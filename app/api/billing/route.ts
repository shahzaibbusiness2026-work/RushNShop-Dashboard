import { NextResponse } from 'next/server';
import { SAAS_PLANS } from '../../../lib/saasPlans';

let userSubscription = {
  planId: 'pro',
  status: 'active',
  billingCycle: 'annual',
  nextBillingDate: '2027-08-25',
  cardLast4: '4242',
};

export async function GET() {
  const plan = SAAS_PLANS.find((p) => p.id === userSubscription.planId) || SAAS_PLANS[0]!;
  return NextResponse.json({
    success: true,
    data: {
      ...userSubscription,
      plan,
      allPlans: SAAS_PLANS,
    },
  });
}

export async function POST(request: Request) {
  try {
    const { planId, billingCycle } = await request.json();
    userSubscription = {
      ...userSubscription,
      planId: planId || 'pro',
      billingCycle: billingCycle || 'annual',
    };
    return NextResponse.json({
      success: true,
      data: userSubscription,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Subscription update failed' },
      { status: 400 },
    );
  }
}
